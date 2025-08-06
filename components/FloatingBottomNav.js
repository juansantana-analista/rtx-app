// components/FloatingBottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import createFloatingNavStyles from '../styles/FloatingBottomNavStyles';

const FloatingBottomNav = ({ 
  activeTab = 'home', 
  onTabPress,
  onWalletPress,
  onProfilePress 
}) => {
  const { theme, themeColors } = useTheme();
  const styles = createFloatingNavStyles({ ...themeColors, theme });

  const navItems = [
    {
      id: 'home',
      icon: 'home',
      iconActive: 'home',
      label: 'Início',
      onPress: () => onTabPress && onTabPress('home'),
    },
    {
      id: 'wallet',
      icon: 'wallet-outline',
      iconActive: 'wallet',
      label: 'Carteira',
      onPress: onWalletPress,
    },
    {
      id: 'investment',
      icon: 'trending-up-outline',
      iconActive: 'trending-up',
      label: 'Investimentos',
      onPress: () => onTabPress && onTabPress('investment'),
    },
    {
      id: 'shop',
      icon: 'bag-outline',
      iconActive: 'bag',
      label: 'Shop',
      onPress: () => onTabPress && onTabPress('shop'),
      hasNotification: false, // Removido notificação de exemplo
    },
    {
      id: 'profile',
      icon: 'person-outline',
      iconActive: 'person',
      label: 'Perfil',
      onPress: onProfilePress,
    },
  ];

  const getIconColor = (item) => {
    if (activeTab === item.id) {
      return theme === 'dark' ? themeColors.white : themeColors.primary; // Ícone ativo: branco no escuro, azul no claro
    }
    return theme === 'dark' 
      ? themeColors.textSecondary || '#8A9199'
      : themeColors.darkGray || '#495057'; // Cor mais escura para tema claro
  };

  const getIconSize = (item) => {
    return activeTab === item.id ? 24 : 22;
  };

  return (
    <View style={styles.floatingNavContainer}>
      <View style={styles.floatingNav}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.floatingNavItem,
                isActive && styles.activeFloatingNavItem,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              {/* Indicador de notificação */}
              {item.hasNotification && !isActive && (
                <View style={styles.floatingNotificationDot} />
              )}

              {/* Ícone */}
              <Ionicons
                name={isActive ? item.iconActive : item.icon}
                size={getIconSize(item)}
                color={getIconColor(item)}
                style={styles.floatingNavIcon}
              />

              {/* Texto - apenas para o item ativo */}
              {isActive && (
                <Text
                  style={[styles.floatingNavText, { fontSize: 10 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FloatingBottomNav;