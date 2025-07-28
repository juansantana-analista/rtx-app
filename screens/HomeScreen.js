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
    { id: 1, title: 'Resgate', icon: 'refresh' },
    { id: 2, title: 'Crédito para investidores', icon: 'card', badge: 'Novo' },
    { id: 3, title: 'Poupança', icon: 'wallet' },
    { id: 4, title: 'Mostrar mais', icon: 'ellipsis-horizontal' },
  ];

  const investmentOptions = [
    { title: 'Renda Fixa', subtitle: 'Vence em 2 anos', yield: '111% do CDI' },
    { title: 'Renda Fixa Isenta', subtitle: 'Vence em 3 anos', yield: '95% do CDI' },
  ];

  const rightActions = [
    { 
      icon: theme === 'dark' ? 'sunny-outline' : 'moon-outline', 
      onPress: toggleTheme 
    },
    { 
      icon: 'eye-outline', 
      onPress: () => console.log('Toggle visibility') 
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
          {/* Card Cripto */}
          <View style={styles.cryptoCard}>
            <View style={styles.cryptoContent}>
              <Text style={styles.cryptoTitle}>A hora</Text>
              <Text style={styles.cryptoTitle}>é agora!</Text>
              <TouchableOpacity style={styles.cryptoButton}>
                <Text style={styles.cryptoButtonText}>Invista em cripto</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cryptoCoin}>
              <Text style={styles.bitcoinIcon}>₿</Text>
            </View>
          </View>

          {/* Card Porquinho */}
          <View style={styles.piggyCard}>
            <View style={styles.piggyBadge}>
              <Text style={styles.piggyBadgeText}>Meu Porquinho</Text>
            </View>
            <View style={styles.piggyContent}>
              <Text style={styles.piggyText}>Seu passaporte</Text>
              <Text style={styles.piggyText}>para a <Text style={styles.piggyHighlight}>reserva</Text></Text>
              <Text style={styles.piggyHighlight}>de emergência!</Text>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Guardar dinheiro</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.piggyIcons}>
              <Text style={styles.pigEmoji}>🐷</Text>
              <View style={styles.lifeRing}>
                <Text style={styles.lifeRingEmoji}>🛟</Text>
              </View>
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
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color={themeColors.darkGray} />
            <Text style={styles.navText}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <Ionicons name="trending-up" size={24} color={themeColors.secondary} />
            <Text style={[styles.navText, styles.activeNavText]}>Invest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="people" size={24} color={themeColors.darkGray} />
            <Text style={styles.navText}>Forum</Text>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="bag" size={24} color={themeColors.darkGray} />
            <Text style={styles.navText}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="grid" size={24} color={themeColors.darkGray} />
            <Text style={styles.navText}>Todos</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;