import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import { apiRequest } from '../services/api';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import createStyles from '../styles/ClientDetailsStyles';

const ClientDetailsScreen = ({ onBack, onNavigate, route }) => {
  const { themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles(themeColors);
  
  const { clientId, client: initialClient } = route?.params || {};
  const [client, setClient] = useState(initialClient);
  const [isLoading, setIsLoading] = useState(!initialClient);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // Dados mockados para demonstração
  const mockClientDetails = {
    id: clientId || 1,
    name: 'João Silva Santos',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - Maringá, PR',
    totalInvested: 150000,
    totalBalance: 165000,
    yield: 10.5,
    status: 'active',
    lastActivity: '2024-01-15',
    registrationDate: '2023-06-15',
    investments: [
      {
        id: 1,
        product: 'PRIVATE',
        amount: 80000,
        currentValue: 90000,
        yield: 12.5,
        startDate: '2023-08-15',
        dueDate: '2024-08-15',
        status: 'active'
      },
      {
        id: 2,
        product: 'PRO',
        amount: 70000,
        currentValue: 75000,
        yield: 8.2,
        startDate: '2023-09-01',
        dueDate: '2024-09-01',
        status: 'active'
      }
    ],
    transactions: [
      {
        id: 1,
        type: 'aporte',
        title: 'Aporte',
        date: '2024-01-15',
        amount: 15000,
        isPositive: true,
        description: 'Aporte realizado via PIX'
      },
      {
        id: 2,
        type: 'rentabilidade',
        title: 'Rentabilidade',
        date: '2024-01-14',
        amount: 2500,
        isPositive: true,
        description: 'Rendimento mensal'
      },
      {
        id: 3,
        type: 'saque',
        title: 'Saque',
        date: '2024-01-10',
        amount: 5000,
        isPositive: false,
        description: 'Saque solicitado'
      }
    ]
  };

  const fetchClientDetails = async () => {
    if (!isAuthenticated || !user?.id || !clientId) {
      setError('Dados do cliente não encontrados');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simula chamada da API - substitua pela API real
      // const result = await apiRequest({
      //   classe: 'GerenteNegocioRestService',
      //   metodo: 'getClienteDetalhes',
      //   params: { 
      //     gerente_id: user.id,
      //     cliente_id: clientId 
      //   }
      // });

      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Usa dados mockados por enquanto
      setClient(mockClientDetails);
    } catch (e) {
      console.error('Erro ao buscar detalhes do cliente:', e);
      setError(e.message || 'Erro ao carregar detalhes do cliente');
      // Em caso de erro, usa dados mockados para demonstração
      setClient(mockClientDetails);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchClientDetails();
    setRefreshing(false);
  };

  useEffect(() => {
    if (!initialClient) {
      fetchClientDetails();
    }
  }, [clientId, user, isAuthenticated]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
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

  const handleContactClient = () => {
    Alert.alert(
      'Contatar Cliente',
      'Escolha uma opção:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ligar', onPress: () => console.log('Ligar para', client.phone) },
        { text: 'WhatsApp', onPress: () => console.log('WhatsApp para', client.phone) },
        { text: 'Email', onPress: () => console.log('Email para', client.email) }
      ]
    );
  };

  const rightActions = [
    {
      icon: 'call-outline',
      action: handleContactClient
    },
    {
      icon: 'share-outline',
      action: () => Alert.alert('Compartilhar', 'Funcionalidade de compartilhamento será implementada')
    }
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text style={[styles.loadingText, { color: themeColors.textSecondary }]}>
          Carregando detalhes do cliente...
        </Text>
      </View>
    );
  }

  if (!client || !client.id) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={themeColors.error} />
        <Text style={[styles.errorText, { color: themeColors.error }]}>
          Cliente não encontrado
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={onBack}>
          <Text style={styles.retryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Detalhes do Cliente"
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
                 {/* Informações do Cliente */}
         <View style={styles.clientInfoCard}>
           <View style={styles.clientHeader}>
             <View style={styles.clientAvatar}>
               <Text style={styles.clientInitial}>
                 {client.name ? client.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A'}
               </Text>
             </View>
             <View style={styles.clientInfo}>
               <Text style={styles.clientName}>{client.name || 'Nome não disponível'}</Text>
               <Text style={styles.clientCpf}>{client.cpf || 'CPF não disponível'}</Text>
               <View style={styles.clientStatus}>
                 <View style={[styles.statusDot, { backgroundColor: getStatusColor(client.status) }]} />
                 <Text style={[styles.statusText, { color: getStatusColor(client.status) }]}>
                   {getStatusText(client.status)}
                 </Text>
               </View>
             </View>
           </View>

           <View style={styles.contactInfo}>
             <View style={styles.contactItem}>
               <Ionicons name="mail-outline" size={16} color={themeColors.textSecondary} />
               <Text style={styles.contactText}>{client.email || 'Email não disponível'}</Text>
             </View>
             <View style={styles.contactItem}>
               <Ionicons name="call-outline" size={16} color={themeColors.textSecondary} />
               <Text style={styles.contactText}>{client.phone || 'Telefone não disponível'}</Text>
             </View>
             <View style={styles.contactItem}>
               <Ionicons name="location-outline" size={16} color={themeColors.textSecondary} />
               <Text style={styles.contactText}>{client.address || 'Endereço não disponível'}</Text>
             </View>
           </View>
         </View>

                 {/* Resumo Financeiro */}
         <View style={styles.financialCard}>
           <Text style={styles.cardTitle}>Resumo Financeiro</Text>
           <View style={styles.financialGrid}>
             <View style={styles.financialItem}>
               <Text style={styles.financialLabel}>Total Investido</Text>
               <Text style={styles.financialValue}>
                 {formatCurrency(client.totalInvested || 0)}
               </Text>
             </View>
             <View style={styles.financialItem}>
               <Text style={styles.financialLabel}>Saldo Atual</Text>
               <Text style={styles.financialValue}>
                 {formatCurrency(client.totalBalance || 0)}
               </Text>
             </View>
             <View style={styles.financialItem}>
               <Text style={styles.financialLabel}>Rentabilidade</Text>
               <Text style={[styles.financialValue, { color: themeColors.success }]}>
                 +{client.yield || 0}%
               </Text>
             </View>
             <View style={styles.financialItem}>
               <Text style={styles.financialLabel}>Data de Cadastro</Text>
               <Text style={styles.financialValue}>
                 {client.registrationDate ? formatDate(client.registrationDate) : 'N/A'}
               </Text>
             </View>
           </View>
         </View>

                 {/* Investimentos */}
         <View style={styles.investmentsCard}>
           <Text style={styles.cardTitle}>Investimentos</Text>
           {client && client.investments && Array.isArray(client.investments) && client.investments.length > 0 ? (
             client.investments.map((investment) => (
               <View key={investment.id || `investment-${Math.random()}`} style={styles.investmentItem}>
                 <View style={styles.investmentHeader}>
                   <Text style={styles.investmentProduct}>{investment.product}</Text>
                   <View style={styles.investmentStatus}>
                     <View style={[styles.statusDot, { backgroundColor: getStatusColor(investment.status) }]} />
                     <Text style={[styles.statusText, { color: getStatusColor(investment.status) }]}>
                       {getStatusText(investment.status)}
                     </Text>
                   </View>
                 </View>
                 <View style={styles.investmentDetails}>
                   <View style={styles.investmentRow}>
                     <Text style={styles.investmentLabel}>Valor Investido:</Text>
                     <Text style={styles.investmentValue}>
                       {formatCurrency(investment.amount)}
                     </Text>
                   </View>
                   <View style={styles.investmentRow}>
                     <Text style={styles.investmentLabel}>Valor Atual:</Text>
                     <Text style={styles.investmentValue}>
                       {formatCurrency(investment.currentValue)}
                     </Text>
                   </View>
                   <View style={styles.investmentRow}>
                     <Text style={styles.investmentLabel}>Rentabilidade:</Text>
                     <Text style={[styles.investmentValue, { color: themeColors.success }]}>
                       +{investment.yield}%
                     </Text>
                   </View>
                   <View style={styles.investmentRow}>
                     <Text style={styles.investmentLabel}>Vencimento:</Text>
                     <Text style={styles.investmentValue}>
                       {formatDate(investment.dueDate)}
                     </Text>
                   </View>
                 </View>
               </View>
             ))
           ) : (
             <View style={styles.emptyContainer}>
               <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
                 Nenhum investimento encontrado
               </Text>
             </View>
           )}
         </View>

                 {/* Histórico de Transações */}
         <View style={styles.transactionsCard}>
           <Text style={styles.cardTitle}>Histórico de Transações</Text>
           {client && client.transactions && Array.isArray(client.transactions) && client.transactions.length > 0 ? (
             client.transactions.map((transaction) => (
               <View key={transaction.id || `transaction-${Math.random()}`} style={styles.transactionItem}>
                 <View style={styles.transactionHeader}>
                   <View style={styles.transactionInfo}>
                     <Text style={styles.transactionTitle}>{transaction.title}</Text>
                     <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
                     <Text style={styles.transactionDescription}>{transaction.description}</Text>
                   </View>
                   <Text style={[
                     styles.transactionAmount,
                     { color: transaction.isPositive ? themeColors.success : themeColors.error }
                   ]}>
                     {transaction.isPositive ? '+' : '-'} {formatCurrency(transaction.amount)}
                   </Text>
                 </View>
               </View>
             ))
           ) : (
             <View style={styles.emptyContainer}>
               <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
                 Nenhuma transação encontrada
               </Text>
             </View>
           )}
         </View>

        {/* Espaço para FloatingBottomNav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Loader flutuante */}
      {isLoading && <FloatingLoader message="Carregando detalhes..." />}
    </View>
  );
};

export default ClientDetailsScreen; 