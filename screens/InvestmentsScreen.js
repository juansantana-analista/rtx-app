import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import createStyles from '../styles/InvestmentsStyles';

const InvestmentsScreen = ({ onBack }) => {
  const { theme, themeColors } = useTheme();
  const { user } = useAuth();
  const styles = createStyles();

  // Estados principais
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Todos');
  const [showRescueModal, setShowRescueModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalYield, setTotalYield] = useState(0);

  // Simular dados de investimentos
  const mockInvestments = [
    {
      id: '1',
      product: 'PRIVATE',
      amount: 5000,
      currentValue: 5150,
      yield: 150,
      yieldPercentage: 3.0,
      monthlyYield: 1.5,
      startDate: '2024-01-15',
      maturityDate: '2025-01-15',
      status: 'active',
      daysInvested: 120,
      totalDays: 365,
      canRescue: true,
      rescueType: 'partial', // partial, total, none
      color: '#7B68EE',
      riskLevel: 'Baixo'
    },
    {
      id: '2', 
      product: 'SELECT',
      amount: 10000,
      currentValue: 10800,
      yield: 800,
      yieldPercentage: 8.0,
      monthlyYield: 2.5,
      startDate: '2023-10-20',
      maturityDate: '2025-10-20',
      status: 'active',
      daysInvested: 280,
      totalDays: 730,
      canRescue: true,
      rescueType: 'partial',
      color: '#4ECDC4',
      riskLevel: 'Médio-Alto'
    },
    {
      id: '3',
      product: 'PRO',
      amount: 3000,
      currentValue: 3240,
      yield: 240,
      yieldPercentage: 8.0,
      monthlyYield: 2.0,
      startDate: '2024-03-10',
      maturityDate: '2025-09-10',
      status: 'active',
      daysInvested: 85,
      totalDays: 548,
      canRescue: false,
      rescueType: 'none',
      color: '#FF6B6B',
      riskLevel: 'Médio'
    },
    {
      id: '4',
      product: 'DEMO',
      amount: 1000,
      currentValue: 1050,
      yield: 50,
      yieldPercentage: 5.0,
      monthlyYield: 1.0,
      startDate: '2024-05-01',
      maturityDate: '2024-11-01',
      status: 'matured',
      daysInvested: 184,
      totalDays: 184,
      canRescue: true,
      rescueType: 'total',
      color: '#4A90E2',
      riskLevel: 'Baixo'
    }
  ];

  // Períodos para filtro
  const periods = ['Todos', 'Ativos', 'Vencidos', 'Este Mês', 'Este Ano'];

  // Carrega investimentos
  const loadInvestments = async () => {
    setIsLoading(true);
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filtrar por período
      let filteredInvestments = mockInvestments;
      
      if (selectedPeriod === 'Ativos') {
        filteredInvestments = mockInvestments.filter(inv => inv.status === 'active');
      } else if (selectedPeriod === 'Vencidos') {
        filteredInvestments = mockInvestments.filter(inv => inv.status === 'matured');
      }
      
      setInvestments(filteredInvestments);
      
      // Calcular totais
      const total = filteredInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
      const totalYieldValue = filteredInvestments.reduce((sum, inv) => sum + inv.yield, 0);
      
      setTotalBalance(total);
      setTotalYield(totalYieldValue);
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os investimentos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInvestments();
  }, [selectedPeriod]);

  // Formata valores monetários
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  // Formata datas
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Calcula progresso do investimento
  const calculateProgress = (investment) => {
    return (investment.daysInvested / investment.totalDays) * 100;
  };

  // Calcula dias restantes
  const getDaysRemaining = (investment) => {
    return investment.totalDays - investment.daysInvested;
  };

  // Abre modal de resgate
  const openRescueModal = (investment) => {
    if (!investment.canRescue) {
      Alert.alert(
        'Resgate Indisponível',
        'Este investimento ainda não permite resgate. Consulte os termos do produto.'
      );
      return;
    }
    
    setSelectedInvestment(investment);
    setShowRescueModal(true);
  };

  // Processa resgate  
  const handleRescue = async (type) => {
    if (!selectedInvestment) return;
    
    const rescueAmount = type === 'total' 
      ? selectedInvestment.currentValue 
      : selectedInvestment.yield;
    
    Alert.alert(
      'Confirmar Resgate',
      `Confirma o resgate ${type === 'total' ? 'total' : 'parcial'} de ${formatCurrency(rescueAmount)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            setShowRescueModal(false);
            
            // Simular processamento
            Alert.alert(
              'Resgate Solicitado!',
              `Seu resgate de ${formatCurrency(rescueAmount)} foi solicitado e será processado em até 2 dias úteis.`,
              [{ text: 'OK', onPress: () => loadInvestments() }]
            );
          }
        }
      ]
    );
  };

  // Renderiza card de investimento
  const renderInvestmentCard = (investment) => (
    <View key={investment.id} style={styles.investmentCard}>
      {/* Header do Card */}
      <View style={styles.investmentHeader}>
        <View style={styles.investmentTitleRow}>
          <View style={[styles.productIndicator, { backgroundColor: investment.color }]} />
          <View style={styles.investmentTitleInfo}>
            <Text style={styles.investmentProduct}>{investment.product}</Text>
            <Text style={styles.investmentRisk}>Risco: {investment.riskLevel}</Text>
          </View>
        </View>
        
        <View style={styles.investmentStatus}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: investment.status === 'active' 
              ? 'rgba(40, 167, 69, 0.1)' 
              : 'rgba(255, 193, 7, 0.1)' 
            }
          ]}>
            <Text style={[
              styles.statusText,
              { color: investment.status === 'active' 
                ? themeColors.success 
                : '#FF9500' 
              }
            ]}>
              {investment.status === 'active' ? 'Ativo' : 'Vencido'}
            </Text>
          </View>
        </View>
      </View>

      {/* Valores */}
      <View style={styles.investmentValues}>
        <View style={styles.valueRow}>
          <Text style={styles.valueLabel}>Investido:</Text>
          <Text style={styles.valueAmount}>{formatCurrency(investment.amount)}</Text>
        </View>
        
        <View style={styles.valueRow}>
          <Text style={styles.valueLabel}>Valor Atual:</Text>
          <Text style={[styles.valueAmount, styles.currentValue]}>
            {formatCurrency(investment.currentValue)}
          </Text>
        </View>
        
        <View style={styles.valueRow}>
          <Text style={styles.valueLabel}>Rendimento:</Text>
          <Text style={[styles.valueAmount, styles.yieldValue]}>
            +{formatCurrency(investment.yield)} ({investment.yieldPercentage.toFixed(1)}%)
          </Text>
        </View>
      </View>

      {/* Progresso */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progresso do Investimento</Text>
          <Text style={styles.progressPercentage}>
            {calculateProgress(investment).toFixed(1)}%
          </Text>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${calculateProgress(investment)}%`,
                backgroundColor: investment.color
              }
            ]} 
          />
        </View>
        
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {investment.daysInvested} de {investment.totalDays} dias
          </Text>
          {investment.status === 'active' && (
            <Text style={styles.progressText}>
              {getDaysRemaining(investment)} dias restantes
            </Text>
          )}
        </View>
      </View>

      {/* Datas */}
      <View style={styles.datesSection}>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Início:</Text>
          <Text style={styles.dateValue}>{formatDate(investment.startDate)}</Text>
        </View>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Vencimento:</Text>
          <Text style={styles.dateValue}>{formatDate(investment.maturityDate)}</Text>
        </View>
      </View>

      {/* Rendimento Mensal */}
      <View style={styles.monthlyYieldSection}>
        <View style={styles.monthlyYieldItem}>
          <Ionicons name="trending-up" size={16} color={themeColors.success} />
          <Text style={styles.monthlyYieldText}>
            {investment.monthlyYield}% ao mês
          </Text>
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => Alert.alert('Detalhes', `Detalhes do investimento ${investment.product}`)}
        >
          <Ionicons name="information-circle-outline" size={20} color={themeColors.secondary} />
          <Text style={styles.detailsButtonText}>Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.rescueButton,
            !investment.canRescue && styles.rescueButtonDisabled
          ]}
          onPress={() => openRescueModal(investment)}
          disabled={!investment.canRescue}
        >
          <Ionicons 
            name="cash-outline" 
            size={20} 
            color={investment.canRescue ? themeColors.white : themeColors.darkGray} 
          />
          <Text style={[
            styles.rescueButtonText,
            !investment.canRescue && styles.rescueButtonTextDisabled
          ]}>
            {investment.canRescue ? 'Resgatar' : 'Bloqueado'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const rightActions = [
    { 
      icon: 'refresh', 
      onPress: () => loadInvestments() 
    },
    { 
      icon: 'filter-outline', 
      onPress: () => Alert.alert('Filtros', 'Funcionalidade de filtros em desenvolvimento') 
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Meus Investimentos"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadInvestments} />
        }
      >
        {/* Card de Resumo */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo dos Investimentos</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Investido</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(totalBalance - totalYield)}
              </Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Valor Atual</Text>
              <Text style={[styles.summaryValue, styles.summaryHighlight]}>
                {formatCurrency(totalBalance)}
              </Text>
            </View>
          </View>
          
          <View style={styles.summaryYield}>
            <View style={styles.yieldItem}>
              <Ionicons name="trending-up" size={20} color={themeColors.success} />
              <Text style={styles.yieldLabel}>Rendimento</Text>
            </View>
            <Text style={styles.yieldAmount}>
              +{formatCurrency(totalYield)}
            </Text>
          </View>
        </View>

        {/* Filtros por Período */}
        <View style={styles.filtersSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.filterButton,
                  selectedPeriod === period && styles.filterButtonActive
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedPeriod === period && styles.filterButtonTextActive
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lista de Investimentos */}
        <View style={styles.investmentsList}>
          {investments.length > 0 ? (
            investments.map(renderInvestmentCard)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="trending-up-outline" size={64} color={themeColors.darkGray} />
              <Text style={styles.emptyStateTitle}>Nenhum investimento encontrado</Text>
              <Text style={styles.emptyStateText}>
                {selectedPeriod === 'Todos' 
                  ? 'Você ainda não possui investimentos ativos.'
                  : `Não há investimentos para o filtro "${selectedPeriod}".`
                }
              </Text>
            </View>
          )}
        </View>

        {/* Espaçamento para a FloatingBottomNav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal de Resgate */}
      <Modal
        visible={showRescueModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Resgatar Investimento</Text>
            <TouchableOpacity
              onPress={() => setShowRescueModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedInvestment && (
              <>
                {/* Informações do Investimento */}
                <View style={styles.rescueInvestmentInfo}>
                  <Text style={styles.rescueInvestmentTitle}>
                    {selectedInvestment.product}
                  </Text>
                  <Text style={styles.rescueInvestmentValue}>
                    Valor Atual: {formatCurrency(selectedInvestment.currentValue)}
                  </Text>
                  <Text style={styles.rescueInvestmentYield}>
                    Rendimento: +{formatCurrency(selectedInvestment.yield)}
                  </Text>
                </View>

                {/* Opções de Resgate */}
                <View style={styles.rescueOptions}>
                  <Text style={styles.rescueOptionsTitle}>Escolha o tipo de resgate:</Text>
                  
                  {selectedInvestment.rescueType === 'total' || selectedInvestment.rescueType === 'partial' ? (
                    <TouchableOpacity
                      style={styles.rescueOptionButton}
                      onPress={() => handleRescue('total')}
                    >
                      <View style={styles.rescueOptionIcon}>
                        <Ionicons name="cash" size={24} color={themeColors.white} />
                      </View>
                      <View style={styles.rescueOptionInfo}>
                        <Text style={styles.rescueOptionTitle}>Resgate Total</Text>
                        <Text style={styles.rescueOptionDescription}>
                          Resgatar todo o valor investido + rendimentos
                        </Text>
                        <Text style={styles.rescueOptionValue}>
                          {formatCurrency(selectedInvestment.currentValue)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}

                  {selectedInvestment.rescueType === 'partial' && (
                    <TouchableOpacity
                      style={styles.rescueOptionButton}
                      onPress={() => handleRescue('partial')}
                    >
                      <View style={[styles.rescueOptionIcon, { backgroundColor: themeColors.success }]}>
                        <Ionicons name="trending-up" size={24} color={themeColors.white} />
                      </View>
                      <View style={styles.rescueOptionInfo}>
                        <Text style={styles.rescueOptionTitle}>Resgate Parcial</Text>
                        <Text style={styles.rescueOptionDescription}>
                          Resgatar apenas os rendimentos obtidos
                        </Text>
                        <Text style={styles.rescueOptionValue}>
                          {formatCurrency(selectedInvestment.yield)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Informações Importantes */}
                <View style={styles.rescueInfo}>
                  <Text style={styles.rescueInfoTitle}>Informações importantes:</Text>
                  <Text style={styles.rescueInfoText}>
                    • O resgate será processado em até 2 dias úteis
                  </Text>
                  <Text style={styles.rescueInfoText}>
                    • Não há taxas para resgate após o período de carência
                  </Text>
                  <Text style={styles.rescueInfoText}>
                    • O valor será creditado na sua conta RTX
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Loader flutuante */}
      {isLoading && <FloatingLoader message="Carregando investimentos..." />}
    </View>
  );
};

export default InvestmentsScreen;