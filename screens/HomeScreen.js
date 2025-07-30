import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import { apiRequest } from '../services/api';
import CustomHeader from '../components/CustomHeader';
import FloatingBottomNav from '../components/FloatingBottomNav';
import createStyles from '../styles/HomeStyles';
import createFloatingNavStyles from '../styles/FloatingBottomNavStyles';

const HomeScreen = ({ onWallet, onProfile, onLogout, onNavigate, onOpenMenu, showFloatingNav = true, showSideMenu = true }) => {
  const { theme, themeColors, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();
  const floatingStyles = createFloatingNavStyles({ ...themeColors, theme });
  const [balance, setBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
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

  const menuItems = [
    { 
      id: 1, 
      title: 'Calculadora de Câmbio', 
      icon: 'calculator',
      onPress: () => console.log('Calculadora de Câmbio')
    },
    { 
      id: 2, 
      title: 'Aporte', 
      icon: 'add-circle', 
      badge: 'Novo',
      onPress: () => onNavigate && onNavigate('aportes')
    },
    { 
      id: 3, 
      title: 'Escritórios', 
      icon: 'business',
      onPress: () => console.log('Escritórios')
    },
    { 
      id: 4, 
      title: 'Mostrar mais', 
      icon: 'ellipsis-horizontal',
      onPress: () => console.log('Mostrar mais')
    },
  ];

  const investmentOptions = [
    { title: 'PRIVATE', subtitle: '4 Meses', yield: '1% ao mês' },
    { title: 'SELECT', subtitle: '24 Meses', yield: '2% ao mês' },
  ];

  const rightActions = [
    { 
      icon: theme === 'dark' ? 'sunny-outline' : 'moon-outline', 
      onPress: toggleTheme 
    },
    { 
      icon: 'notifications-outline', 
      onPress: () => console.log('Notifications') 
    }
  ];

  const handleWalletPress = () => {
    setActiveTab('wallet');
    if (onWallet && typeof onWallet === 'function') {
      onWallet();
    } else {
      console.warn('onWallet function not provided');
    }
  };

  const handleProfilePress = () => {
    setActiveTab('profile');
    if (onProfile && typeof onProfile === 'function') {
      onProfile();
    } else {
      console.warn('onProfile function not provided');
    }
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    console.log('Tab selecionada:', tabId);
    
    // Navegação para outras telas
    switch (tabId) {
      case 'investment':
        if (onNavigate && typeof onNavigate === 'function') {
          onNavigate('investment');
        }
        break;
      case 'shop':
        console.log('Navegar para shop');
        break;
      default:
        break;
    }
  };

  const handleLogoutPress = () => {
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    } else {
      console.warn('onLogout function not provided');
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        showCenteredLogo={true}
        leftIcon="menu-outline"
        leftAction={onOpenMenu}
        rightActions={rightActions}
      />

      {/* Conteúdo Rolável */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }} // Espaço para o nav flutuante
      >
        {/* Card de Saldo */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceAmount}>
              {isLoadingBalance ? 'Carregando...' : (isBalanceVisible ? `R$ ${Number(balance).toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : '••••••••••')}
            </Text>
            {balanceError ? <Text style={{color: 'red', fontSize: 12}}>{balanceError}</Text> : null}
            <View style={styles.balanceActions}>
              <TouchableOpacity style={styles.balanceActionButton} onPress={handleRefreshBalance}>
                <Ionicons name="refresh" size={20} color={themeColors.secondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.balanceActionButton} onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
                <Ionicons 
                  name={isBalanceVisible ? "eye-off" : "eye"} 
                  size={20} 
                  color={themeColors.secondary} 
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.balanceCardActions}>
            <TouchableOpacity style={styles.accessWallet} onPress={handleWalletPress}>
              <Text style={styles.accessWalletText}>Acessar carteira</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.addBalanceButton} 
              onPress={() => onNavigate && onNavigate('addBalance')}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={18} color={themeColors.white} />
              <Text style={styles.addBalanceText}>Adicionar Saldo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu de Ações */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons 
                  name={item.icon} 
                  size={24} 
                  color={item.id === 4 ? themeColors.darkGray : themeColors.secondary} 
                />
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cards Promocionais */}
        <View style={styles.promoSection}>
          {/* Card Participação Disponível */}
          <View style={styles.participationCard}>
            <View style={styles.participationContent}>
              <Text style={styles.participationTitle}>Participação</Text>
              <Text style={styles.participationTitle}>Disponível</Text>
              <Text style={styles.participationPeriod}>do dia 01 ao dia 05</Text>
              <TouchableOpacity style={styles.participationButton}>
                <Text style={styles.participationButtonText}>Participar agora</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.participationIcon}>
              <Text style={styles.calendarIcon}>📅</Text>
            </View>
          </View>
        </View>

        {/* Oportunidades do Dia */}
        <View style={styles.opportunitiesSection}>
          <Text style={styles.sectionTitle}>Oportunidades do dia</Text>
          
          {investmentOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.investmentCard}>
              <View style={styles.investmentInfo}>
                <Text style={styles.investmentTitle}>{option.title}</Text>
                <Text style={styles.investmentSubtitle}>{option.subtitle}</Text>
                <Text style={styles.investmentYield}>{option.yield}</Text>
                <View style={styles.yieldIndicator} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Espaçamento para o nav flutuante */}
        <View style={floatingStyles.bottomSpacing} />
      </ScrollView>

      {/* Navigation Bar Flutuante - apenas se showFloatingNav for true */}
      {showFloatingNav && (
        <FloatingBottomNav
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onWalletPress={handleWalletPress}
          onProfilePress={handleProfilePress}
        />
      )}
    </View>
  );
};

export default HomeScreen;