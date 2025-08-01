import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import createStyles from '../styles/WalletStyles';
import { useAuth } from '../constants/AuthContext';
import { apiRequest } from '../services/api';

const WalletScreen = ({ onBack, showFloatingNav = true, onNavigate, onFloatingNavVisibilityChange }) => {
  // Ocultar FloatingBottomNav quando qualquer modal estiver aberto
  const shouldShowFloatingNav = showFloatingNav && !showRescueModal && !showSuccessModal;
  
  // Animações para os modais
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const { theme, themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();
  const [selectedPeriod, setSelectedPeriod] = useState('Mês');
  const [balance, setBalance] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [isRescueBalanceVisible, setIsRescueBalanceVisible] = useState(false);
  const [balanceError, setBalanceError] = useState('');
  const [showRescueModal, setShowRescueModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rescueAmount, setRescueAmount] = useState('');
  const [selectedPercentage, setSelectedPercentage] = useState(null);
  const [confirmedAmount, setConfirmedAmount] = useState(0);

  const fetchBalance = async () => {
    if (!isAuthenticated || !user?.id) {
      setBalance(null);
      setBalanceError('');
      setIsLoadingBalance(false);
      return;
    }
    setIsLoadingBalance(true);
    setBalanceError('');
    try {
      const result = await apiRequest({
        classe: 'CarteiraRestService',
        metodo: 'getCarteirasUsuario',
        params: { usuario_id: user.id }
      });
      if (result.status === 'success' && result.data && result.data.length > 0) {
        setBalance(result.data[0].saldo);
        setTotalBalance(result.data[0].saldo_total);
      } else {
        setBalance('0');
        setTotalBalance('0');
        setBalanceError('Saldo não encontrado');
      }
    } catch (e) {
      // Se for erro de autenticação, não mostra erro na tela
      if (e.message.includes('Sessão expirada') || e.message.includes('Token') || e.message.includes('login')) {
        console.log('Erro de autenticação ao buscar saldo:', e.message);
        // O logout será tratado automaticamente pelo apiRequest
        return;
      }
      setBalanceError(e.message || 'Erro ao buscar saldo');
    } finally {
      setIsLoadingBalance(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user, isAuthenticated]);

  // Ocultar FloatingBottomNav quando modal de resgate abre
  useEffect(() => {
    if (showRescueModal && onFloatingNavVisibilityChange) {
      onFloatingNavVisibilityChange(false);
    }
  }, [showRescueModal]);

  // Inicializar animações quando modais são abertos
  useEffect(() => {
    if (showSuccessModal) {
      // Ocultar FloatingBottomNav quando modal de sucesso abre
      if (onFloatingNavVisibilityChange) {
        onFloatingNavVisibilityChange(false);
      }
      // Animar entrada do modal de sucesso
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showSuccessModal]);

  const handleRefreshBalance = () => {
    fetchBalance();
  };

  // Formata a data para exibição
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formata o valor monetário
  const formatCurrency = (amount) => {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  const handlePrintExtract = async () => {
    console.log('Função handlePrintExtract chamada!');
    
    // Navegar para a tela de extrato em PDF
    if (onNavigate) {
      onNavigate('extractPdf');
    }
  };

  // Dados mockados dos investimentos do cliente
  const userInvestments = [
    {
      id: 1,
      productName: 'PRIVATE',
      companyLogo: 'RTX',
      investedAmount: 50000,
      period: '12 meses',
      yield: '14.5%',
      dueDate: '2024-12-15',
      status: 'active',
      color: '#1a1a2e'
    },
    {
      id: 2,
      productName: 'SELECT',
      companyLogo: 'RTX',
      investedAmount: 75000,
      period: '24 meses',
      yield: '18.2%',
      dueDate: '2025-06-20',
      status: 'active',
      color: '#16213e'
    },
    {
      id: 3,
      productName: 'PRO',
      companyLogo: 'RTX',
      investedAmount: 120000,
      period: '36 meses',
      yield: '22.1%',
      dueDate: '2026-03-10',
      status: 'active',
      color: '#0f3460'
    },
    {
      id: 4,
      productName: 'PREMIUM',
      companyLogo: 'RTX',
      investedAmount: 250000,
      period: '48 meses',
      yield: '25.8%',
      dueDate: '2027-01-25',
      status: 'active',
      color: '#533483'
    }
  ];

  // Estado para controlar visibilidade dos valores dos cartões
  const [visibleCards, setVisibleCards] = useState({});

  const toggleCardVisibility = (cardId) => {
    setVisibleCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Funções para o modal de resgate
  const openRescueModal = () => {
    setShowRescueModal(true);
    setRescueAmount('');
    setSelectedPercentage(null);
    // Animar entrada do modal
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeRescueModal = () => {
    // Animar saída do modal
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowRescueModal(false);
      setRescueAmount('');
      setSelectedPercentage(null);
      // Mostrar FloatingBottomNav novamente
      if (onFloatingNavVisibilityChange) {
        onFloatingNavVisibilityChange(true);
      }
    });
  };

  const handlePercentageSelect = (percentage) => {
    const availableBalance = Number(balance || 0);
    const calculatedAmount = (availableBalance * percentage) / 100;
    setRescueAmount(calculatedAmount.toFixed(2));
    setSelectedPercentage(percentage);
  };

  const handleRescueAmountChange = (text) => {
    // Remove caracteres não numéricos exceto ponto e vírgula
    const cleanedText = text.replace(/[^\d.,]/g, '');
    setRescueAmount(cleanedText);
    setSelectedPercentage(null);
  };

  const formatRescueAmount = (amount) => {
    if (!amount) return '';
    const numAmount = parseFloat(amount.replace(',', '.'));
    return numAmount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleConfirmRescue = () => {
    if (!rescueAmount || parseFloat(rescueAmount) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para resgate.');
      return;
    }

    const amount = parseFloat(rescueAmount.replace(',', '.'));
    const availableBalance = Number(balance || 0);

    if (amount > availableBalance) {
      Alert.alert('Erro', 'O valor de resgate não pode ser maior que o saldo disponível.');
      return;
    }

    Alert.alert(
      'Confirmar Resgate',
      `Deseja confirmar o resgate de R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            console.log('Resgate confirmado:', amount);
            setConfirmedAmount(amount);
            closeRescueModal();
            // Aguardar a animação de fechamento do modal de resgate
            setTimeout(() => {
              setShowSuccessModal(true);
            }, 200);
            // Aqui você pode adicionar a lógica para processar o resgate
          }
        }
      ]
    );
  };

  const closeSuccessModal = () => {
    // Animar saída do modal
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowSuccessModal(false);
      setConfirmedAmount(0);
      // Mostrar FloatingBottomNav novamente
      if (onFloatingNavVisibilityChange) {
        onFloatingNavVisibilityChange(true);
      }
    });
  };





  // Dados mockados do extrato
  const transactionHistory = [
    {
      id: 1,
      type: 'reinvestimento',
      title: 'Reinvestimento',
      date: '2024-01-15',
      amount: 350.00,
      isPositive: true,
    },
    {
      id: 2,
      type: 'saque',
      title: 'Saque',
      date: '2024-01-14',
      amount: 480.00,
      isPositive: false,
    },
    {
      id: 3,
      type: 'rentabilidade',
      title: 'Rentabilidade',
      date: '2024-01-13',
      amount: 1300.00,
      percentage: '2,6%',
      isPositive: true,
    },
    {
      id: 4,
      type: 'aporte',
      title: 'Aporte',
      date: '2024-01-12',
      amount: 1000.00,
      isPositive: true,
    },
    {
      id: 5,
      type: 'rentabilidade',
      title: 'Rentabilidade',
      date: '2024-01-11',
      amount: 850.00,
      percentage: '1,8%',
      isPositive: true,
    },
    {
      id: 6,
      type: 'saque',
      title: 'Saque',
      date: '2024-01-10',
      amount: 250.00,
      isPositive: false,
    },
    {
      id: 7,
      type: 'aporte',
      title: 'Aporte',
      date: '2024-01-09',
      amount: 2000.00,
      isPositive: true,
    },
  ];

  const rightActions = [
    { icon: 'refresh-outline', onPress: handleRefreshBalance },
    { icon: 'print-outline', onPress: () => {
      console.log('Botão de impressão clicado no header!');
      handlePrintExtract();
    }},
    { icon: 'notifications-outline', onPress: () => console.log('Notifications') }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Carteira"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      {/* Conteúdo Rolável */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                 {/* Card Principal */}
         <View style={styles.balanceCard}>
           <View style={styles.balanceHeader}>
             <View style={styles.balanceInfo}>
               <Text style={styles.balanceLabel}>SALDO TOTAL EM OPERAÇÃO</Text>
               <Text style={styles.balance}>
                 {isLoadingBalance ? 'Carregando...' : (isBalanceVisible ? `R$ ${Number(totalBalance || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : '••••••••••')}
               </Text>
             </View>
             <TouchableOpacity 
               style={styles.balanceVisibilityButton}
               onPress={() => setIsBalanceVisible(!isBalanceVisible)}
             >
               <Ionicons 
                 name={isBalanceVisible ? "eye-off" : "eye"} 
                 size={20} 
                 color={themeColors.secondary} 
               />
             </TouchableOpacity>
           </View>
           {balanceError ? <Text style={{color: 'red', fontSize: 12}}>{balanceError}</Text> : null}
           
           {/* Botão Novo Aporte */}
           <TouchableOpacity 
             style={styles.newAporteButton}
             onPress={() => onNavigate && onNavigate('aportes')}
             activeOpacity={0.8}
           >
             <Ionicons name="add-circle" size={24} color={themeColors.white} />
             <Text style={styles.newAporteButtonText}>Novo Aporte</Text>
           </TouchableOpacity>

           {/* Seção de Resgate */}
           <View style={styles.rescueSection}>
             <Text style={styles.rescueLabel}>Disponível para resgate</Text>
             <Ionicons name="help-circle" size={16} color={themeColors.secondary} style={styles.rescueHelp} />
             <View style={styles.rescueRow}>
               <View style={styles.rescueAmountContainer}>
                 <Text style={styles.rescueAmount}>
                   {isRescueBalanceVisible ? `R$ ${Number(balance || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : '••••••••••'}
                 </Text>
                 <TouchableOpacity 
                   style={styles.rescueBalanceVisibilityButton}
                   onPress={() => setIsRescueBalanceVisible(!isRescueBalanceVisible)}
                 >
                   <Ionicons 
                     name={isRescueBalanceVisible ? "eye-off" : "eye"} 
                     size={16} 
                     color={themeColors.secondary} 
                   />
                 </TouchableOpacity>
               </View>
               <TouchableOpacity onPress={openRescueModal}>
                 <Text style={styles.rescueButton}>Resgatar</Text>
               </TouchableOpacity>
             </View>
           </View>
        </View>

        {/* Seção de Cartões de Investimento */}
        <View style={styles.investmentsSection}>
          <View style={styles.investmentsHeader}>
            <Text style={styles.investmentsTitle}>Meus Investimentos</Text>
            <Ionicons name="help-circle" size={16} color={themeColors.secondary} />
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.investmentsScroll}
            contentContainerStyle={styles.investmentsScrollContent}
          >
            {userInvestments.map((investment) => (
              <TouchableOpacity
                key={investment.id}
                style={[styles.investmentCard, { backgroundColor: investment.color }]}
                onPress={() => console.log('Investimento clicado:', investment.productName)}
                activeOpacity={0.8}
              >
                {/* Header do Cartão */}
                <View style={styles.cardHeader}>
                  <View style={styles.companyLogo}>
                    <Text style={styles.companyLogoText}>{investment.companyLogo}</Text>
                  </View>
                  <View style={styles.cardStatus}>
                    <View style={[styles.statusDot, { backgroundColor: investment.status === 'active' ? themeColors.success : themeColors.error }]} />
                    <Text style={styles.statusText}>
                      {investment.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Text>
                  </View>
                </View>

                {/* Nome do Produto */}
                <Text style={styles.productName}>{investment.productName}</Text>

                {/* Valor Investido */}
                <View style={styles.amountContainer}>
                  <Text style={styles.investedAmount}>
                    {visibleCards[investment.id] ? `R$ ${investment.investedAmount.toLocaleString('pt-BR')}` : '••••••••••'}
                  </Text>
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => toggleCardVisibility(investment.id)}
                  >
                    <Ionicons 
                      name={visibleCards[investment.id] ? "eye-off" : "eye"} 
                      size={16} 
                      color={themeColors.white} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Informações do Investimento */}
                <View style={styles.investmentInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Período:</Text>
                    <Text style={styles.infoValue}>{investment.period}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Rentabilidade:</Text>
                    <Text style={styles.infoValue}>{investment.yield}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Vencimento:</Text>
                    <Text style={styles.infoValue}>{formatDate(investment.dueDate)}</Text>
                  </View>
                </View>

                
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Seção do Extrato */}
        <View style={styles.extractSection}>
          <View style={styles.extractHeader}>
            <Text style={styles.extractTitle}>Extrato</Text>
            <TouchableOpacity style={styles.printButton} onPress={() => {
              console.log('Botão de impressão clicado na seção do extrato!');
              handlePrintExtract();
            }}>
              <Ionicons name="print-outline" size={20} color={themeColors.secondary} />
              <Text style={styles.printButtonText}>Imprimir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.extractList}>
            {transactionHistory.map((transaction) => (
              <View key={transaction.id} style={styles.transactionRow}>
                <View style={styles.transactionLeft}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
                </View>
                <View style={styles.transactionRight}>
                  {transaction.percentage && (
                    <Text style={styles.transactionPercentage}>{transaction.percentage}</Text>
                  )}
                  <Text style={[
                    styles.transactionAmount,
                    transaction.isPositive ? styles.positiveAmount : styles.negativeAmount
                  ]}>
                    {transaction.isPositive ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Espaçamento para a FloatingBottomNav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal de Resgate */}
      {showRescueModal && (
        <Animated.View 
          style={[
            styles.modalOverlay,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Resgatar</Text>
              <TouchableOpacity onPress={closeRescueModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={themeColors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.availableBalanceLabel}>Saldo disponível para resgate</Text>
              <Text style={styles.availableBalanceAmount}>
                R$ {Number(balance || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
              </Text>

              <Text style={styles.amountLabel}>Valor do resgate</Text>
              <TextInput
                style={styles.amountInput}
                value={rescueAmount}
                onChangeText={handleRescueAmountChange}
                placeholder="0,00"
                placeholderTextColor={themeColors.mediumGray}
                keyboardType="numeric"
              />

              <Text style={styles.percentageLabel}>Ou selecione uma porcentagem</Text>
              <View style={styles.percentageButtons}>
                {[30, 50, 80, 100].map((percentage) => (
                  <TouchableOpacity
                    key={percentage}
                    style={[
                      styles.percentageButton,
                      selectedPercentage === percentage && styles.selectedPercentageButton
                    ]}
                    onPress={() => handlePercentageSelect(percentage)}
                  >
                    <Text style={[
                      styles.percentageButtonText,
                      selectedPercentage === percentage && styles.selectedPercentageButtonText
                    ]}>
                      {percentage}%
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={closeRescueModal}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleConfirmRescue}
              >
                <Text style={styles.confirmButtonText}>Confirmar Resgate</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      )}

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <Animated.View 
          style={[
            styles.modalOverlay,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sucesso!</Text>
              <TouchableOpacity onPress={closeSuccessModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={themeColors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.successIconContainer}>
                <View style={styles.successIconCircle}>
                  <Ionicons name="checkmark" size={40} color={themeColors.white} />
                </View>
              </View>
              
              <Text style={styles.successTitle}>Solicitação de Saque Realizada com Sucesso!</Text>
              
              <Text style={styles.successAmount}>
                R$ {confirmedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
              
              <Text style={styles.successMessage}>
                O valor será transferido em breve para sua conta cadastrada.
              </Text>
              
              <Text style={styles.successInfo}>
                Você receberá uma confirmação por e-mail assim que a transferência for processada.
              </Text>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={closeSuccessModal}
              >
                <Text style={styles.confirmButtonText}>Entendi</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      )}

      {/* Loader flutuante */}
      {isLoadingBalance && <FloatingLoader message="Carregando carteira..." />}
    </View>
  );
};

export default WalletScreen;