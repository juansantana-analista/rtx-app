import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/HomeStyles';

const HomeScreen = ({ onWallet, onLogout }) => {
  const { theme, themeColors, toggleTheme } = useTheme();
  const styles = createStyles();
  const [balance] = useState('R$ 180.250,00');

  const menuItems = [
    { id: 1, title: 'Calculadora de Câmbio', icon: 'calculator' },
    { id: 2, title: 'Simulador', icon: 'analytics', badge: 'Novo' },
    { id: 3, title: 'Escritórios', icon: 'business' },
    { id: 4, title: 'Mostrar mais', icon: 'ellipsis-horizontal' },
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

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Investimentos"
        leftIcon="log-out-outline"
        leftAction={onLogout}
        rightActions={rightActions}
      />

      {/* Conteúdo Rolável */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card de Saldo */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceAmount}>{balance}</Text>
            <View style={styles.balanceActions}>
              <TouchableOpacity>
                <Ionicons name="refresh" size={20} color={themeColors.secondary} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="eye" size={20} color={themeColors.secondary} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.accessWallet} onPress={onWallet}>
            <Text style={styles.accessWalletText}>Acessar carteira</Text>
          </TouchableOpacity>
        </View>

        {/* Menu de Ações */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={24} color={item.id === 4 ? themeColors.darkGray : themeColors.secondary} />
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
      </ScrollView>

      {/* Navegação Inferior */}
      <SafeAreaView style={styles.bottomNavSafeArea}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <Ionicons name="home" size={24} color={themeColors.secondary} />
            <Text style={[styles.navText, styles.activeNavText]}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={onWallet}>
            <Ionicons name="wallet" size={24} color={themeColors.darkGray} />
            <Text style={styles.navText}>Carteira</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="trending-up" size={24} color={themeColors.darkGray} />
            <Text style={styles.navText}>Investimento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="bag" size={24} color={themeColors.darkGray} />
            <Text style={styles.navText}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={24} color={themeColors.darkGray} />
            <Text style={styles.navText}>Meu perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;