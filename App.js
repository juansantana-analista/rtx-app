import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './constants/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import { StyleSheet, View, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'home', 'wallet'

  // Configuração inicial da Navigation Bar
  useEffect(() => {
    const configureInitialNavigationBar = async () => {
      if (Platform.OS === 'android') {
        try {
          // Configuração inicial para tema escuro (padrão)
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
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onLogin={() => setCurrentScreen('home')}
          />
        );
      case 'home':
        return (
          <HomeScreen 
            onWallet={() => setCurrentScreen('wallet')}
            onLogout={() => setCurrentScreen('login')}
          />
        );
      case 'wallet':
        return (
          <WalletScreen 
            onBack={() => setCurrentScreen('home')} 
          />
        );
      default:
        return (
          <LoginScreen 
            onLogin={() => setCurrentScreen('home')}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        {renderScreen()}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});