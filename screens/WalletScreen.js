import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/WalletStyles';
import { useAuth } from '../constants/AuthContext';
import { apiRequest } from '../services/api';

const WalletScreen = ({ onBack, showFloatingNav = true }) => {
  const { theme, themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();
  const [selectedPeriod, setSelectedPeriod] = useState('Mês');
  const [balance, setBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [balanceError, setBalanceError] = useState('');

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
      } else {
        setBalance('0');
        setBalanceError('Saldo não encontrado');
      }
    } catch (e) {
      setBalanceError(e.message || 'Erro ao buscar saldo');
    } finally {
      setIsLoadingBalance(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user, isAuthenticated]);

  const handleRefreshBalance = () => {
    fetchBalance();
  };

  const monthlyData = [
    { month: 'fev/24', amount: 'R$ 0,5k', height: 60 },
    { month: 'mar/24', amount: 'R$ 0,6k', height: 70 },
    { month: 'abr/24', amount: 'R$ 0,4k', height: 50 },
    { month: 'mai/24', amount: 'R$ 1,0k', height: 80 },
    { month: 'jun/24', amount: 'R$ 0,5k', height: 60 },
    { month: 'jul', amount: 'R$ 0,6k', height: 70 },
  ];

  const investmentTypes = [
    { title: 'DEMO', percentage: 2 },
    { title: 'PRIVATE', percentage: 2 },
    { title: 'PRO', percentage: 2 },
    { title: 'SELECT', percentage: 2 },
    { title: 'D+2', percentage: 2 },
    { title: 'EVOLVE', percentage: 2 },
    { title: 'ABSOLUTE', percentage: 2 },
  ];

  const rightActions = [
    { icon: 'refresh-outline', onPress: handleRefreshBalance },
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
             <Text style={styles.balance}>
               {isLoadingBalance ? 'Carregando...' : (isBalanceVisible ? `R$ ${Number(balance).toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : '••••••••••')}
             </Text>
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
          {/* Breakdown de Investimentos */}
          <View style={styles.investmentBreakdown}>
                         <View style={styles.investmentRow}>
               <View style={styles.flagContainer}>
                 <Text style={styles.flag}>🇧🇷</Text>
                 <Text style={styles.investmentLabel}>Investido no Brasil</Text>
               </View>
               <Text style={styles.investmentAmount}>
                 {isBalanceVisible ? `R$ ${Number(balance).toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : '••••••••••'}
               </Text>
             </View>
            
            <View style={styles.investmentRow}>
              <View style={styles.flagContainer}>
                <Text style={styles.flag}>🇺🇸</Text>
                <Text style={styles.investmentLabel}>Investido nos EUA</Text>
                <Ionicons name="help-circle" size={16} color={themeColors.secondary} style={styles.helpIcon} />
              </View>
              <TouchableOpacity>
                <Text style={styles.investUSA}>Invista nos EUA</Text>
              </TouchableOpacity>
            </View>
            
                         <View style={styles.investmentRow}>
               <View style={styles.flagContainer}>
                 <Text style={styles.cryptoIcon}>₿</Text>
                 <Text style={styles.investmentLabel}>Investido em Cripto</Text>
               </View>
               <Text style={styles.investmentAmount}>
                 {isBalanceVisible ? '-' : '••••••••••'}
               </Text>
             </View>
          </View>

                     {/* Seção de Resgate */}
           <View style={styles.rescueSection}>
             <Text style={styles.rescueLabel}>Disponível para resgate</Text>
             <Ionicons name="help-circle" size={16} color={themeColors.secondary} style={styles.rescueHelp} />
             <View style={styles.rescueRow}>
               <Text style={styles.rescueAmount}>
                 {isBalanceVisible ? `R$ ${Number(balance).toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : '••••••••••'}
               </Text>
               <TouchableOpacity>
                 <Text style={styles.rescueButton}>Resgatar</Text>
               </TouchableOpacity>
             </View>
           </View>
        </View>

        {/* Seção Brasil */}
        <View style={styles.brazilSection}>
          <View style={styles.brazilHeader}>
            <Text style={styles.brazilTitle}>Investido no Brasil</Text>
            <Ionicons name="help-circle" size={16} color={themeColors.secondary} />
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.reorderText}>Reordenar</Text>
            </TouchableOpacity>
          </View>

          {/* Seletor de Período */}
          <View style={styles.periodSelector}>
            {['Semana', 'Mês', 'Ano'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.selectedPeriodButton
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.selectedPeriodButtonText
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
            <View style={styles.updateInfo}>
              <Text style={styles.updateText}>ATUALIZADO</Text>
              <Text style={styles.updateText}>NESTE MOMENTO</Text>
            </View>
          </View>

          {/* Gráfico de Barras */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.chartContainer}
          >
            {monthlyData.map((data, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={[styles.bar, { height: data.height }]} />
                <Text style={styles.barAmount}>{data.amount}</Text>
                <Text style={styles.barMonth}>{data.month}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Lista de Tipos de Investimento */}
          <View style={styles.investmentTypesList}>
            {investmentTypes.map((type, index) => (
              <TouchableOpacity key={index} style={styles.investmentTypeRow}>
                <View style={styles.investmentTypeLeft}>
                  <View style={styles.percentageCircle}>
                    <Text style={styles.percentageText}>{type.percentage}%</Text>
                  </View>
                  <Text style={styles.investmentTypeName}>{type.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={themeColors.darkGray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WalletScreen;