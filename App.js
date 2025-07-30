import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './constants/ThemeContext';
import { AuthProvider, useAuth } from './constants/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import ProfileScreen from './screens/ProfileScreen';
import AportesScreen from './screens/AportesScreen';
import InvestmentsScreen from './screens/InvestmentsScreen';
import AddBalanceScreen from './screens/AddBalanceScreen';
import FloatingBottomNav from './components/FloatingBottomNav';
import SideMenu from './components/SideMenu';
import LoadingScreen from './components/LoadingScreen';
import SplashScreen from './components/SplashScreen';
import { StyleSheet, View, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

// Componente principal que usa autenticação
const AppContent = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

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

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
    setActiveTab(screen);
    setIsMenuVisible(false);
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
            showFloatingNav={false}
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
          <AddBalanceScreen 
            onBack={() => handleNavigation('home')}
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
      {shouldShowFloatingNav && currentScreen !== 'addBalance' && currentScreen !== 'aportes' && (
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