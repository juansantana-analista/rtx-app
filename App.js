import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './constants/ThemeContext';
import { AuthProvider, useAuth } from './constants/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import ProfileScreen from './screens/ProfileScreen';
import AportesScreen from './screens/AportesScreen';
import InvestmentsScreen from './screens/InvestmentsScreen';
import NewsScreen from './screens/NewsScreen';
import ExtractPdfScreen from './screens/ExtractPdfScreen';
import OfficesScreen from './screens/OfficesScreen';
import MyClientsScreen from './screens/MyClientsScreen';
import ClientDetailsScreen from './screens/ClientDetailsScreen';

import FloatingBottomNav from './components/FloatingBottomNav';
import SideMenu from './components/SideMenu';
import LoadingScreen from './components/LoadingScreen';
import SplashScreen from './components/SplashScreen';
import { StyleSheet, View, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import DeviceService from './services/deviceService';

// Componente principal que usa autenticação
const AppContent = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [navigationParams, setNavigationParams] = useState(null);
  const [deviceUUID, setDeviceUUID] = useState(null);

  // Inicialização do UUID do dispositivo
  useEffect(() => {
    const initializeDeviceUUID = async () => {
      try {
        const uuid = await DeviceService.getDeviceUUID();
        setDeviceUUID(uuid);
        console.log('📱 UUID do dispositivo inicializado:', uuid);
      } catch (error) {
        console.error('❌ Erro ao inicializar UUID do dispositivo:', error);
      }
    };

    initializeDeviceUUID();
  }, []);

  // Configuração inicial da Navigation Bar
  useEffect(() => {
    const configureInitialNavigationBar = async () => {
      if (Platform.OS === 'android') {
        try {
          await NavigationBar.setBackgroundColorAsync('#0F1419');
          await NavigationBar.setButtonStyleAsync('light');
        } catch (error) {
          console.error('Erro na configuração inicial da Navigation Bar:', error);
        }
      }
    };

    configureInitialNavigationBar();
  }, []);

  const handleNavigation = (screen, params = null) => {
    setCurrentScreen(screen);
    setActiveTab(screen);
    setIsMenuVisible(false);
    setNavigationParams(params);
  };

  const handleLogout = () => {
    setCurrentScreen('home');
    setActiveTab('home');
    setIsMenuVisible(false);
    logout();
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    setCurrentScreen(tabId);
  };

  const handleMenuNavigation = (screen) => {
    handleNavigation(screen);
  };

  const handleOpenMenu = () => {
    setIsMenuVisible(true);
  };

  // Garantir que o menu seja fechado quando o usuário faz login
  useEffect(() => {
    if (isAuthenticated) {
      setIsMenuVisible(false);
    }
  }, [isAuthenticated]);

  // Se está carregando, mostra tela de splash animada
  if (isLoading) {
    return <SplashScreen />;
  }

  // Se não está autenticado, mostra tela de login
  if (!isAuthenticated) {
    if (currentScreen !== 'home' || activeTab !== 'home') {
      setCurrentScreen('home');
      setActiveTab('home');
    }
    return <LoginScreen />;
  }

  // Se está autenticado, mostra o app principal
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onWallet={() => handleNavigation('wallet')}
            onProfile={() => handleNavigation('profile')}
            onLogout={handleLogout}
            onNavigate={handleNavigation}
            onOpenMenu={handleOpenMenu}
            showFloatingNav={false}
            showSideMenu={false}
          />
        );
      case 'wallet':
        return (
          <WalletScreen 
            onBack={() => handleNavigation('home')} 
            showFloatingNav={true}
            onNavigate={handleNavigation}
            onFloatingNavVisibilityChange={(show) => {
              // Esta função será chamada pelo WalletScreen para controlar a visibilidade
              setIsWalletModalOpen(!show);
            }}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            onBack={() => handleNavigation('home')}
            showFloatingNav={false}
          />
        );
      case 'aportes':
        return (
          <AportesScreen 
            onBack={() => handleNavigation('home')}
            showFloatingNav={false}
          />
        );
      case 'investment':
        return (
          <InvestmentsScreen 
            onBack={() => handleNavigation('home')}
            showFloatingNav={true}
          />
        );
      case 'addBalance':
        return (
          <AportesScreen 
            onBack={() => handleNavigation('home')}
            showFloatingNav={false}
          />
        );
      case 'news':
        return (
          <NewsScreen 
            onBack={() => handleNavigation('home')}
            showFloatingNav={false}
          />
        );
      case 'extractPdf':
        return (
          <ExtractPdfScreen 
            onBack={() => handleNavigation('wallet')}
            showFloatingNav={false}
            transactionHistory={[
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
            ]}
          />
        );
      case 'offices':
        return (
          <OfficesScreen 
            onBack={() => handleNavigation('home')}
            showFloatingNav={false}
          />
        );
      case 'myClients':
        return (
          <MyClientsScreen 
            onBack={() => handleNavigation('home')}
            onNavigate={handleNavigation}
            showFloatingNav={false}
          />
        );
      case 'clientDetails':
        return (
          <ClientDetailsScreen 
            onBack={() => handleNavigation('myClients')}
            onNavigate={handleNavigation}
            route={{ params: navigationParams }}
            showFloatingNav={false}
          />
        );
      default:
        return (
          <HomeScreen 
            onWallet={() => handleNavigation('wallet')}
            onProfile={() => handleNavigation('profile')}
            onLogout={handleLogout}
            onNavigate={handleNavigation}
            onOpenMenu={handleOpenMenu}
            showFloatingNav={false}
            showSideMenu={false}
          />
        );
    }
  };

  // Determinar se deve mostrar a navegação flutuante
  const shouldShowFloatingNav = isAuthenticated;

  // Se não está autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderScreen()}
      
      {/* Menu Lateral Global */}
      {shouldShowFloatingNav && isMenuVisible && (
        <SideMenu
          isVisible={isMenuVisible}
          onClose={() => setIsMenuVisible(false)}
          onLogout={handleLogout}
          onNavigate={handleMenuNavigation}
        />
      )}

      {/* Navegação Flutuante Global */}
      {shouldShowFloatingNav && 
       currentScreen !== 'addBalance' && 
       currentScreen !== 'aportes' && 
       currentScreen !== 'myClients' && 
       currentScreen !== 'clientDetails' && 
       !isWalletModalOpen && (
        <FloatingBottomNav
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onWalletPress={() => handleNavigation('wallet')}
          onProfilePress={() => handleNavigation('profile')}
        />
      )}
    </View>
  );
};

// App principal com providers
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});