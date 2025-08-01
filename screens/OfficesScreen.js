import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Image,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import { createStyles } from '../styles/OfficesStyles';
import { useAuth } from '../constants/AuthContext';
import { apiRequest } from '../services/api';

const OfficesScreen = ({ onBack }) => {
  const { themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles(themeColors);
  const [offices, setOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOffices = async () => {
    if (!isAuthenticated || !user?.id) {
      setOffices([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await apiRequest({
        classe: 'EscritorioRestService',
        metodo: 'loadAll'
      });

      if (result.status === 'success' && result.data) {
        setOffices(result.data);
      } else {
        setOffices([]);
        Alert.alert('Erro', 'Não foi possível carregar os escritórios.');
      }
    } catch (error) {
      console.error('Erro ao buscar escritórios:', error);
      setOffices([]);
      Alert.alert('Erro', 'Erro ao carregar escritórios. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, [user, isAuthenticated]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOffices();
    setRefreshing(false);
  };

  const handleCallOffice = (phone) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleWhatsAppOffice = (whatsapp) => {
    if (whatsapp) {
      const message = 'Olá! Gostaria de mais informações sobre os serviços.';
      const url = `whatsapp://send?phone=${whatsapp}&text=${encodeURIComponent(message)}`;
      Linking.openURL(url);
    }
  };

  const handleEmailOffice = (email) => {
    if (email) {
      const subject = 'Informações sobre serviços';
      const body = 'Olá! Gostaria de mais informações sobre os serviços.';
      const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      Linking.openURL(url);
    }
  };

  const handleOfficePress = (office) => {
    Alert.alert(
      office.nome,
      'Escolha uma opção de contato:',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Ligar',
          onPress: () => handleCallOffice(office.whatsapp)
        },
        {
          text: 'WhatsApp',
          onPress: () => handleWhatsAppOffice(office.whatsapp)
        },
        {
          text: 'Email',
          onPress: () => handleEmailOffice(office.email)
        }
      ]
    );
  };

  const rightActions = [
    { 
      icon: 'refresh-outline', 
      onPress: handleRefresh 
    }
  ];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomHeader 
          title="Escritórios"
          leftIcon="arrow-back"
          leftAction={onBack}
          rightActions={rightActions}
        />
        <View style={styles.content}>
          {/* Conteúdo vazio durante loading */}
        </View>
        <FloatingLoader message="Carregando escritórios..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Escritórios"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[themeColors.secondary]}
            tintColor={themeColors.secondary}
          />
        }
      >
        {/* Header Institucional */}
        <View style={styles.institutionalHeader}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>RTX</Text>
          </View>
          <Text style={styles.headerTitle}>Nossa Rede de Escritórios</Text>
          <Text style={styles.headerSubtitle}>
            Encontre o escritório mais próximo de você e entre em contato
          </Text>
        </View>

        {/* Lista de Escritórios */}
        {offices.length > 0 ? (
          <View style={styles.officesContainer}>
            {offices.map((office, index) => (
              <TouchableOpacity
                key={office.id}
                style={styles.officeCard}
                onPress={() => handleOfficePress(office)}
                activeOpacity={0.7}
              >
                {/* Imagem do Escritório */}
                <View style={styles.officeImageContainer}>
                  {office.foto ? (
                    <Image
                      source={{ uri: office.foto }}
                      style={styles.officeImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.officeImagePlaceholder, { backgroundColor: office.cor || themeColors.secondary }]}>
                      <Ionicons name="business" size={40} color={themeColors.white} />
                    </View>
                  )}
                  <View style={styles.officeStatus}>
                    <View style={[styles.statusDot, { backgroundColor: office.status === 'A' ? themeColors.success : themeColors.error }]} />
                    <Text style={styles.statusText}>
                      {office.status === 'A' ? 'Ativo' : 'Inativo'}
                    </Text>
                  </View>
                </View>

                {/* Informações do Escritório */}
                <View style={styles.officeInfo}>
                  <Text style={styles.officeName}>{office.nome}</Text>
                  
                  {/* Contatos */}
                  <View style={styles.contactSection}>
                    {office.whatsapp && (
                      <TouchableOpacity
                        style={styles.contactItem}
                        onPress={() => handleWhatsAppOffice(office.whatsapp)}
                      >
                        <Ionicons name="logo-whatsapp" size={16} color={themeColors.success} />
                        <Text style={styles.contactText}>{office.whatsapp}</Text>
                      </TouchableOpacity>
                    )}

                    {office.email && (
                      <TouchableOpacity
                        style={styles.contactItem}
                        onPress={() => handleEmailOffice(office.email)}
                      >
                        <Ionicons name="mail-outline" size={16} color={themeColors.secondary} />
                        <Text style={styles.contactText}>{office.email}</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Botões de Ação */}
                  <View style={styles.actionButtons}>
                    {office.whatsapp && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.whatsappButton]}
                        onPress={() => handleWhatsAppOffice(office.whatsapp)}
                      >
                        <Ionicons name="logo-whatsapp" size={16} color={themeColors.white} />
                        <Text style={styles.actionButtonText}>WhatsApp</Text>
                      </TouchableOpacity>
                    )}

                    {office.whatsapp && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.callButton]}
                        onPress={() => handleCallOffice(office.whatsapp)}
                      >
                        <Ionicons name="call-outline" size={16} color={themeColors.white} />
                        <Text style={styles.actionButtonText}>Ligar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="business-outline" size={80} color={themeColors.mediumGray} />
            <Text style={styles.emptyTitle}>Nenhum escritório encontrado</Text>
            <Text style={styles.emptySubtitle}>
              Não há escritórios disponíveis no momento.
            </Text>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
              <Ionicons name="refresh-outline" size={20} color={themeColors.secondary} />
              <Text style={styles.refreshButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Informações Adicionais */}
        <View style={styles.additionalInfo}>
          <Text style={styles.additionalInfoTitle}>Horário de Atendimento</Text>
          <Text style={styles.additionalInfoText}>
            Segunda a Sexta: 8h às 18h{'\n'}
            Sábado: 8h às 12h
          </Text>
        </View>

        {/* Espaçamento para a FloatingBottomNav */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default OfficesScreen; 