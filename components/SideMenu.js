import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';

const { width } = Dimensions.get('window');

const SideMenu = ({ isVisible, onClose, onLogout, onNavigate }) => {
  const { theme, themeColors, toggleTheme } = useTheme();
  const { user, logout } = useAuth();



  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Meu Perfil',
      action: () => onNavigate('profile')
    },
    {
      icon: 'wallet-outline',
      title: 'Carteira',
      action: () => onNavigate('wallet')
    },
    {
      icon: 'settings-outline',
      title: 'Configurações',
      action: () => console.log('Configurações')
    },
    {
      icon: 'help-circle-outline',
      title: 'Ajuda',
      action: () => console.log('Ajuda')
    },
    {
      icon: theme === 'dark' ? 'sunny-outline' : 'moon-outline',
      title: `Tema ${theme === 'dark' ? 'Claro' : 'Escuro'}`,
      action: toggleTheme
    },
    {
      icon: 'log-out-outline',
      title: 'Sair',
      action: logout,
      isLogout: true
    }
  ];

  // Função para gerar iniciais do nome
  const getInitials = (name) => {
    if (!name || name.trim() === '') return 'U';
    
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    const firstInitial = words[0].charAt(0).toUpperCase();
    const lastInitial = words[words.length - 1].charAt(0).toUpperCase();
    
    return firstInitial + lastInitial;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayTouchable} 
          onPress={onClose}
          activeOpacity={1}
        />
        
        <View style={[styles.menuContainer, { backgroundColor: themeColors.cardBackground }]}>
          <SafeAreaView style={styles.menuContent}>
            {/* Header do Menu */}
            <View style={[styles.menuHeader, { borderBottomColor: themeColors.border || themeColors.mediumGray }]}>
              <Image 
                source={theme === 'dark' ? require('../assets/rtx-x-color.png') : require('../assets/rtx-x-black.png')} 
                style={styles.logoImage}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={themeColors.text} />
              </TouchableOpacity>
            </View>

            {/* Informações do Usuário - Clicável para ir ao perfil */}
            <TouchableOpacity 
              style={styles.userInfo}
              onPress={() => {
                onNavigate('profile');
                onClose();
              }}
              activeOpacity={0.7}
            >
                             <View style={[styles.userAvatar, { backgroundColor: themeColors.primary }]}>
                 <Text style={styles.userInitial}>{getInitials(user?.name || 'Usuário')}</Text>
               </View>
               <Text style={[styles.userName, { color: themeColors.text }]} numberOfLines={2}>
                 {user?.name || 'Usuário'}
               </Text>
               <Text style={[styles.userEmail, { color: themeColors.textSecondary || themeColors.darkGray }]}>
                 {user?.cpf || '000.000.000-00'}
               </Text>
              
              {/* Indicador de que é clicável */}
              <View style={styles.profileIndicator}>
                <Ionicons name="chevron-forward" size={16} color={themeColors.textTertiary || themeColors.darkGray} />
              </View>
            </TouchableOpacity>

            {/* Linha divisória */}
            <View style={[styles.divider, { backgroundColor: themeColors.border || themeColors.mediumGray }]} />

            {/* Itens do Menu */}
            <View style={styles.menuItems}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    { backgroundColor: themeColors.lightGray },
                    item.isLogout && { 
                      borderTopWidth: 1, 
                      borderTopColor: themeColors.border || themeColors.mediumGray, 
                      marginTop: 16, 
                      paddingTop: 20,
                      backgroundColor: 'transparent'
                    }
                  ]}
                  onPress={() => {
                    item.action();
                    if (!item.isLogout && item.title !== 'Tema Claro' && item.title !== 'Tema Escuro') {
                      onClose();
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.menuItemIcon,
                    { backgroundColor: item.isLogout ? 'transparent' : themeColors.primary }
                  ]}>
                    <Ionicons 
                      name={item.icon} 
                      size={20} 
                      color={item.isLogout ? themeColors.error : themeColors.white} 
                    />
                  </View>
                  <Text style={[
                    styles.menuItemText, 
                    { color: item.isLogout ? themeColors.error : themeColors.text }
                  ]}>
                    {item.title}
                  </Text>
                  <Ionicons 
                    name="chevron-forward" 
                    size={16} 
                    color={themeColors.textTertiary || themeColors.darkGray} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Footer */}
            <View style={styles.menuFooter}>
              <Text style={[styles.appVersion, { color: themeColors.textTertiary || themeColors.darkGray }]}>
                RTX App v1.0.0
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    width: width * 0.82,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  logoImage: {
    width: 120,
    height: 30,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fundo mais visível para tema claro
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    position: 'relative',
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInitial: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: -0.2,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  profileIndicator: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fundo mais visível para tema claro
    borderRadius: 12,
    padding: 4,
  },
  divider: {
    height: 1,
    marginHorizontal: 24,
    marginBottom: 8,
  },
  menuItems: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    flex: 1,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  menuFooter: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SideMenu;