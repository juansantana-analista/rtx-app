import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';

const NavigationMenu = ({ onNavigate }) => {
  const { theme, themeColors, toggleTheme } = useTheme();
  const screens = [
    {
      id: 'login',
      title: 'Tela de Login',
      subtitle: 'Autenticação do usuário',
      icon: 'log-in',
      color: themeColors.secondary,
    },
    {
      id: 'home',
      title: 'Tela Inicial',
      subtitle: 'Dashboard de investimentos',
      icon: 'home',
      color: themeColors.secondary,
    },
    {
      id: 'wallet',
      title: 'Carteira',
      subtitle: 'Detalhes dos investimentos',
      icon: 'wallet',
      color: themeColors.primary,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.primary }]}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={themeColors.primary} 
      />
      
      {/* Header com logo centralizado */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/logortx.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Menu de Telas */}
      <View style={styles.content}>
        {screens.map((screen) => (
          <TouchableOpacity
            key={screen.id}
            style={styles.menuItem}
            onPress={() => onNavigate(screen.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: screen.color }]}>
              <Ionicons name={screen.icon} size={32} color={themeColors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>{screen.title}</Text>
              <Text style={styles.menuSubtitle}>{screen.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={themeColors.darkGray} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Aplicativo RTX</Text>
        <Text style={styles.footerSubtext}>Versão de Desenvolvimento</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: themeColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 280,
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: themeColors.white,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    backgroundColor: themeColors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.cardBackground,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: themeColors.darkGray,
  },
  footer: {
    backgroundColor: themeColors.cardBackground,
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: themeColors.darkGray,
  },
});

export default NavigationMenu;
