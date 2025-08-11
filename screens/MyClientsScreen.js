import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import { apiRequest } from '../services/api';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import createStyles from '../styles/MyClientsStyles';

const MyClientsScreen = ({ onBack, onNavigate }) => {
  const { themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles(themeColors);
  
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [skeletonOpacity] = useState(new Animated.Value(0.3));

  // Animação do skeleton
  useEffect(() => {
    if (isLoading) {
      const animateSkeleton = () => {
        Animated.sequence([
          Animated.timing(skeletonOpacity, {
            toValue: 0.7,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(skeletonOpacity, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start(() => animateSkeleton());
      };
      animateSkeleton();
    }
  }, [isLoading, skeletonOpacity]);

  // Componente Skeleton para card de cliente
  const ClientSkeleton = () => (
    <View style={styles.clientCard}>
      <View style={styles.clientHeader}>
        <View style={styles.clientInfo}>
          <Animated.View 
            style={[
              styles.skeletonLine, 
              { 
                width: '50%', 
                height: 16, 
                alignSelf: 'flex-start',
                opacity: skeletonOpacity,
                backgroundColor: themeColors.border 
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.skeletonLine, 
              { 
                width: '35%', 
                height: 12, 
                marginTop: 6,
                alignSelf: 'flex-start',
                opacity: skeletonOpacity,
                backgroundColor: themeColors.border 
              }
            ]} 
          />
        </View>
        <Animated.View 
          style={[
            styles.skeletonLine, 
            { 
              width: 36, 
              height: 16, 
              alignSelf: 'flex-start',
              opacity: skeletonOpacity,
              backgroundColor: themeColors.border 
            }
          ]} 
        />
      </View>

      <View style={styles.clientDetails}>
        <View style={styles.detailRow}>
          <Animated.View 
            style={[
              styles.skeletonLine, 
              { 
                width: '60%', 
                height: 12, 
                alignSelf: 'flex-start',
                opacity: skeletonOpacity,
                backgroundColor: themeColors.border 
              }
            ]} 
          />
        </View>
        <View style={styles.detailRow}>
          <Animated.View 
            style={[
              styles.skeletonLine, 
              { 
                width: '40%', 
                height: 12, 
                alignSelf: 'flex-start',
                opacity: skeletonOpacity,
                backgroundColor: themeColors.border 
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.clientFinancial}>
        <View style={styles.financialItem}>
          <Animated.View 
            style={[
              styles.skeletonLine, 
              { 
                width: '60%', 
                height: 12, 
                alignSelf: 'flex-start',
                opacity: skeletonOpacity,
                backgroundColor: themeColors.border 
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.skeletonLine, 
              { 
                width: '30%', 
                height: 12, 
                alignSelf: 'flex-start',
                marginLeft: 8,
                opacity: skeletonOpacity,
                backgroundColor: themeColors.border 
              }
            ]} 
          />
        </View>
        <View style={styles.financialItem}>
          <Animated.View 
            style={[
              styles.skeletonLine, 
              { 
                width: '50%', 
                height: 12, 
                alignSelf: 'flex-start',
                opacity: skeletonOpacity,
                backgroundColor: themeColors.border 
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.skeletonLine, 
              { 
                width: '25%', 
                height: 12, 
                alignSelf: 'flex-start',
                marginLeft: 8,
                opacity: skeletonOpacity,
                backgroundColor: themeColors.border 
              }
            ]} 
          />
        </View>
      </View>
    </View>
  );

  // Dados mockados para demonstração
  const mockClients = [
    {
      id: 1,
      name: 'João Silva Santos',
      cpf: '123.456.789-00',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      totalInvested: 150000,
      totalBalance: 165000,
      yield: 10.5,
      status: 'active',
      lastActivity: '2024-01-15',
      investments: [
        { product: 'PRIVATE', amount: 80000, yield: 12.5 },
        { product: 'PRO', amount: 70000, yield: 8.2 }
      ]
    },
    {
      id: 2,
      name: 'Maria Oliveira Costa',
      cpf: '987.654.321-00',
      email: 'maria.oliveira@email.com',
      phone: '(11) 88888-8888',
      totalInvested: 85000,
      totalBalance: 92000,
      yield: 8.2,
      status: 'active',
      lastActivity: '2024-01-14',
      investments: [
        { product: 'DEMO', amount: 25000, yield: 5.0 },
        { product: 'PRIVATE', amount: 60000, yield: 9.8 }
      ]
    },
    {
      id: 3,
      name: 'Pedro Santos Lima',
      cpf: '456.789.123-00',
      email: 'pedro.santos@email.com',
      phone: '(11) 77777-7777',
      totalInvested: 200000,
      totalBalance: 225000,
      yield: 12.5,
      status: 'active',
      lastActivity: '2024-01-13',
      investments: [
        { product: 'SELECT', amount: 100000, yield: 15.2 },
        { product: 'EVOLVE', amount: 100000, yield: 9.8 }
      ]
    },
    {
      id: 4,
      name: 'Ana Costa Ferreira',
      cpf: '789.123.456-00',
      email: 'ana.costa@email.com',
      phone: '(11) 66666-6666',
      totalInvested: 120000,
      totalBalance: 128000,
      yield: 6.7,
      status: 'inactive',
      lastActivity: '2024-01-10',
      investments: [
        { product: 'PRIVATE', amount: 120000, yield: 6.7 }
      ]
    }
  ];

  const fetchClients = async () => {
    if (!isAuthenticated || !user?.id) {
      setClients([]);
      setError('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simula chamada da API - substitua pela API real
      // const result = await apiRequest({
      //   classe: 'GerenteNegocioRestService',
      //   metodo: 'getClientes',
      //   params: { gerente_id: user.id }
      // });

      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Usa dados mockados por enquanto
      setClients(mockClients);
    } catch (e) {
      console.error('Erro ao buscar clientes:', e);
      setError(e.message || 'Erro ao carregar clientes');
      // Em caso de erro, usa dados mockados para demonstração
      setClients(mockClients);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchClients();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchClients();
  }, [user, isAuthenticated]);

  const handleClientPress = (client) => {
    onNavigate('clientDetails', { clientId: client.id, client: client });
  };

  const handleAddClient = () => {
    onNavigate('addClient');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status) => {
    return status === 'active' ? themeColors.success : themeColors.error;
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Ativo' : 'Inativo';
  };

  const rightActions = [
    {
      icon: 'search-outline',
      action: () => Alert.alert('Buscar', 'Funcionalidade de busca será implementada')
    },
    {
      icon: 'filter-outline',
      action: () => Alert.alert('Filtrar', 'Funcionalidade de filtro será implementada')
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Meus Clientes"
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
            onRefresh={onRefresh}
            colors={[themeColors.primary]}
            tintColor={themeColors.primary}
          />
        }
      >
        {/* Resumo */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total de Clientes</Text>
              <Text style={styles.summaryValue}>{clients.length}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Clientes Ativos</Text>
              <Text style={styles.summaryValue}>
                {clients.filter(c => c.status === 'active').length}
              </Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Investido</Text>
              <Text style={styles.summaryValue} numberOfLines={1}>
                {formatCurrency(clients.reduce((sum, c) => sum + c.totalInvested, 0))}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Rentabilidade Média</Text>
              <Text style={[styles.summaryValue, { color: themeColors.success }]}>
                {clients.length > 0 
                  ? `${(clients.reduce((sum, c) => sum + c.yield, 0) / clients.length).toFixed(1)}%`
                  : '0%'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Botão de Adicionar Cliente */}
        <TouchableOpacity
          style={styles.addClientButton}
          onPress={handleAddClient}
          activeOpacity={0.8}
        >
          <View style={styles.addClientIcon}>
            <Ionicons name="person-add" size={24} color={themeColors.white} />
          </View>
          <View style={styles.addClientContent}>
            <Text style={styles.addClientTitle}>Adicionar Novo Cliente</Text>
            <Text style={styles.addClientSubtitle}>Cadastre um novo cliente e defina seus investimentos</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={themeColors.white} />
        </TouchableOpacity>

        {/* Lista de Clientes */}
        <View style={styles.clientsSection}>
          <Text style={styles.sectionTitle}>Clientes</Text>
          
          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={24} color={themeColors.error} />
              <Text style={[styles.errorText, { color: themeColors.error }]}>
                {error}
              </Text>
            </View>
          ) : isLoading ? (
            // Skeleton loading
            Array.from({ length: 4 }).map((_, index) => (
              <ClientSkeleton key={`skeleton-${index}`} />
            ))
          ) : clients.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color={themeColors.textSecondary} />
              <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
                Nenhum cliente encontrado
              </Text>
              <Text style={[styles.emptySubtext, { color: themeColors.textSecondary }]}>
                Os clientes que você trouxer aparecerão aqui
              </Text>
            </View>
          ) : (
            clients.map((client) => (
              <TouchableOpacity
                key={client.id}
                style={styles.clientCard}
                onPress={() => handleClientPress(client)}
                activeOpacity={0.7}
              >
                <View style={styles.clientHeader}>
                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName} numberOfLines={1}>
                      {client.name}
                    </Text>
                    <Text style={styles.clientCpf}>{client.cpf}</Text>
                  </View>
                  <View style={styles.clientStatus}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(client.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(client.status) }]}>
                      {getStatusText(client.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.clientDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="mail-outline" size={16} color={themeColors.textSecondary} />
                    <Text style={styles.detailText} numberOfLines={1}>
                      {client.email}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={16} color={themeColors.textSecondary} />
                    <Text style={styles.detailText}>
                      {client.phone}
                    </Text>
                  </View>
                </View>

                <View style={styles.clientFinancial}>
                  <View style={styles.financialItem}>
                    <Text style={styles.financialLabel}>Total Investido</Text>
                    <Text style={styles.financialValue} numberOfLines={1}>
                      {formatCurrency(client.totalInvested)}
                    </Text>
                  </View>
                  <View style={styles.financialItem}>
                    <Text style={styles.financialLabel}>Saldo Atual</Text>
                    <Text style={styles.financialValue} numberOfLines={1}>
                      {formatCurrency(client.totalBalance)}
                    </Text>
                  </View>
                  <View style={styles.financialItem}>
                    <Text style={styles.financialLabel}>Rentabilidade</Text>
                    <Text style={[styles.financialValue, { color: themeColors.success }]} numberOfLines={1}>
                      +{client.yield}%
                    </Text>
                  </View>
                </View>

                <View style={styles.clientFooter}>
                  <Text style={styles.lastActivity}>
                    Última atividade: {formatDate(client.lastActivity)}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={themeColors.textSecondary} />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Espaço final */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Loader flutuante */}
      {isLoading && <FloatingLoader message="Carregando clientes..." />}
    </View>
  );
};

export default MyClientsScreen;