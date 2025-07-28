import React, { useState } from 'react';
import { ThemeProvider } from './constants/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import { StyleSheet, View } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'home', 'wallet'

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
