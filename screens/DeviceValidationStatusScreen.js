import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import useDeviceValidation from '../hooks/useDeviceValidation';
import createStyles from '../styles/DeviceValidationStatusStyles';

const DeviceValidationStatusScreen = () => {
  const { themeColors } = useTheme();
  const { user, logout, completeDeviceValidation } = useAuth();
  const styles = createStyles();
  
  const {
    checkStatus,
    isLoading,
    error,
    revalidate
  } = useDeviceValidation(user);
  
  const [validationData, setValidationData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastCheck, setLastCheck] = useState(new Date());

  useEffect(() => {
    // Verificar status inicial
    handleCheckStatus();
    
    // Verificar status periodicamente (a cada 30 segundos)
    const interval = setInterval(() => {
      handleCheckStatus();
    }, 30000);

    // Limpar interval após 10 minutos
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 600000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleCheckStatus = async () => {
    try {
      const status = await checkStatus();
      setValidationData(status);
      setLastCheck(new Date());
      
      // Se foi aprovado, completar validação
      if (status?.approved) {
        completeDeviceValidation();
        Alert.alert(
          'Dispositivo Aprovado!',
          'Seu dispositivo foi validado com sucesso. Você já pode usar o aplicativo.',
          [{ text: 'Continuar' }]
        );
      }
      
      // Se foi rejeitado, mostrar opções
      if (status?.rejected) {
        Alert.alert(
          'Validação Rejeitada',
          status.rejection_reason || 'Sua solicitação foi rejeitada. Entre em contato com o suporte ou tente novamente.',
          [
            { text: 'Tentar Novamente', onPress: handleRetry },
            { text: 'Contatar Suporte', onPress: handleContactSupport },
            { text: 'Sair', onPress: logout, style: 'destructive' }
          ]
        );
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await handleCheckStatus();
    setRefreshing(false);
  };

  const handleRetry = () => {
    Alert.alert(
      'Tentar Novamente',
      'Isso irá reiniciar o processo de validação. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sim, Tentar Novamente', 
          onPress: async () => {
            try {
              await revalidate();
              // Navegar de volta para a tela de validação
              // Isso seria controlado pelo App.js baseado no estado
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível reiniciar a validação.');
            }
          }
        }
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contatar Suporte',
      'Entre em contato conosco através de:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'WhatsApp', onPress: () => console.log('Abrir WhatsApp') },
        { text: 'Email', onPress: () => console.log('Abrir Email') },
        { text: 'Telefone', onPress: () => console.log('Abrir Telefone') }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair do App',
      'Deseja realmente sair? Você precisará validar o dispositivo novamente no próximo login.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout }
      ]
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusInfo = () => {
    if (!validationData) {
      return {
        icon: 'time',
        iconColor: themeColors.warning || '#FF9500',
        title: 'Verificando Status...',
        description: 'Aguarde enquanto verificamos o status da sua validação.',
        backgroundColor: 'rgba(255, 149, 0, 0.1)'
      };
    }

    if (validationData.approved) {
      return {
        icon: 'checkmark-circle',
        iconColor: themeColors.success,
        title: 'Dispositivo Aprovado!',
        description: 'Seu dispositivo foi validado com sucesso.',
        backgroundColor: 'rgba(40, 167, 69, 0.1)'
      };
    }

    if (validationData.rejected) {
      return {
        icon: 'close-circle',
        iconColor: themeColors.error,
        title: 'Validação Rejeitada',
        description: validationData.rejection_reason || 'Sua solicitação foi rejeitada.',
        backgroundColor: 'rgba(220, 53, 69, 0.1)'
      };
    }

    return {
      icon: 'hourglass',
      iconColor: themeColors.warning || '#FF9500',
      title: 'Aguardando Validação',
      description: 'Sua solicitação está sendo analisada pela nossa equipe.',
      backgroundColor: 'rgba(255, 149, 0, 0.1)'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Status da Validação"
        rightActions={[
          { 
            icon: 'log-out-outline', 
            onPress: handleLogout 
          }
        ]}
      />

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[themeColors.primary]}
            tintColor={themeColors.primary}
          />
        }
      >
        <View style={styles.statusContainer}>
          {/* Status Principal */}
          <View style={[styles.statusCard, { backgroundColor: statusInfo.backgroundColor }]}>
            <View style={styles.statusIcon}>
              <Ionicons 
                name={statusInfo.icon} 
                size={64} 
                color={statusInfo.iconColor} 
              />
            </View>
            
            <Text style={styles.statusTitle}>{statusInfo.title}</Text>
            <Text style={styles.statusDescription}>{statusInfo.description}</Text>
          </View>

          {/* Informações da Validação */}
          {validationData && (
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Detalhes da Validação</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status:</Text>
                <Text style={[
                  styles.infoValue,
                  { color: statusInfo.iconColor }
                ]}>
                  {validationData.approved ? 'Aprovado' : 
                   validationData.rejected ? 'Rejeitado' : 'Pendente'}
                </Text>
              </View>

              {validationData.submitted_at && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Enviado em:</Text>
                  <Text style={styles.infoValue}>
                    {new Date(validationData.submitted_at).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              )}

              {validationData.processed_at && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Processado em:</Text>
                  <Text style={styles.infoValue}>
                    {new Date(validationData.processed_at).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              )}

              {validationData.estimated_time && !validationData.approved && !validationData.rejected && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Tempo estimado:</Text>
                  <Text style={styles.infoValue}>{validationData.estimated_time}</Text>
                </View>
              )}
            </View>
          )}

          {/* Instruções */}
          <View style={styles.instructionsCard}>
            <Text style={styles.instructionsTitle}>Próximos Passos</Text>
            
            {!validationData?.approved && !validationData?.rejected && (
              <View style={styles.instructionsList}>
                <View style={styles.instructionItem}>
                  <Ionicons name="time" size={20} color={themeColors.primary} />
                  <Text style={styles.instructionText}>
                    Aguarde a análise da nossa equipe
                  </Text>
                </View>
                
                <View style={styles.instructionItem}>
                  <Ionicons name="refresh" size={20} color={themeColors.primary} />
                  <Text style={styles.instructionText}>
                    Puxe a tela para baixo para atualizar o status
                  </Text>
                </View>
                
                <View style={styles.instructionItem}>
                  <Ionicons name="notifications" size={20} color={themeColors.primary} />
                  <Text style={styles.instructionText}>
                    Você será notificado quando a validação for concluída
                  </Text>
                </View>
              </View>
            )}

            {validationData?.rejected && (
              <View style={styles.instructionsList}>
                <View style={styles.instructionItem}>
                  <Ionicons name="refresh-circle" size={20} color={themeColors.primary} />
                  <Text style={styles.instructionText}>
                    Você pode tentar novamente o processo de validação
                  </Text>
                </View>
                
                <View style={styles.instructionItem}>
                  <Ionicons name="help-circle" size={20} color={themeColors.primary} />
                  <Text style={styles.instructionText}>
                    Entre em contato com o suporte se precisar de ajuda
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Botões de Ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={handleCheckStatus}
              disabled={isLoading}
            >
              <Ionicons name="refresh" size={20} color={themeColors.primary} />
              <Text style={styles.refreshButtonText}>Verificar Status</Text>
            </TouchableOpacity>

            {validationData?.rejected && (
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}
              >
                <Ionicons name="refresh-circle" size={20} color={themeColors.white} />
                <Text style={styles.retryButtonText}>Tentar Novamente</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.supportButton}
              onPress={handleContactSupport}
            >
              <Ionicons name="help-circle" size={20} color={themeColors.secondary} />
              <Text style={styles.supportButtonText}>Contatar Suporte</Text>
            </TouchableOpacity>
          </View>

          {/* Última Verificação */}
          <View style={styles.lastCheckInfo}>
            <Text style={styles.lastCheckText}>
              Última verificação: {formatTime(lastCheck)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {isLoading && <FloatingLoader message="Verificando status..." />}
    </View>
  );
};

export default DeviceValidationStatusScreen;