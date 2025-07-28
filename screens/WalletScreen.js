import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import createStyles from '../styles/WalletStyles';

const WalletScreen = ({ onBack }) => {
  const { theme, themeColors } = useTheme();
  const styles = createStyles();
  const [selectedPeriod, setSelectedPeriod] = useState('Mês');
  const [balance] = useState('R$ 180.250,00');

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

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={themeColors.primary} 
        translucent={false} 
      />
      
      {/* Header Fixo */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={themeColors.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Carteira</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="refresh" size={20} style={styles.headerIconColor} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="eye" size={20} style={styles.headerIconColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Conteúdo Rolável */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card Principal */}
        <View style={styles.balanceCard}>
          <Text style={styles.balance}>{balance}</Text>
          
          {/* Breakdown de Investimentos */}
          <View style={styles.investmentBreakdown}>
            <View style={styles.investmentRow}>
              <View style={styles.flagContainer}>
                <Text style={styles.flag}>🇧🇷</Text>
                <Text style={styles.investmentLabel}>Investido no Brasil</Text>
              </View>
              <Text style={styles.investmentAmount}>{balance}</Text>
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
              <Text style={styles.investmentAmount}>-</Text>
            </View>
          </View>

          {/* Seção de Resgate */}
          <View style={styles.rescueSection}>
            <Text style={styles.rescueLabel}>Disponível para resgate</Text>
            <Ionicons name="help-circle" size={16} color={themeColors.secondary} style={styles.rescueHelp} />
            <View style={styles.rescueRow}>
              <Text style={styles.rescueAmount}>{balance}</Text>
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
