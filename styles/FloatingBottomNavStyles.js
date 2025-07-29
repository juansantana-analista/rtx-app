// styles/FloatingBottomNavStyles.js
import { StyleSheet, Platform } from 'react-native';

const createFloatingNavStyles = (themeColors) => {
  return StyleSheet.create({
    // Container principal - sem interferir com o conteúdo
    floatingNavContainer: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 34 : 20, // Considera safe area do iOS
      left: 20,
      right: 20,
      zIndex: 1000,
    },
    
    // Barra de navegação flutuante
    floatingNav: {
      flexDirection: 'row',
      backgroundColor: themeColors.theme === 'dark' 
        ? 'rgba(26, 31, 37, 0.98)' // Escuro semi-transparente
        : 'rgba(255, 255, 255, 0.95)', // Claro semi-transparente
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 8,
      shadowColor: themeColors.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: themeColors.theme === 'dark' ? 0.3 : 0.15,
      shadowRadius: 16,
      elevation: 12,
      // Efeito de blur/backdrop (simulado com cores)
      borderWidth: 1,
      borderColor: themeColors.theme === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.05)',
    },

    // Item individual de navegação
    floatingNavItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
      borderRadius: 18,
    },

    /* Item ativo
    activeFloatingNavItem: {
      backgroundColor: themeColors.secondary,
      transform: [{ scale: 1.05 }],
      shadowColor: themeColors.secondary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },*/

    // Ícone do item
    floatingNavIcon: {
      marginBottom: 4,
    },

    // Texto do item (apenas para ativo)
    floatingNavText: {
      fontSize: 11,
      fontWeight: '400',
      color: themeColors.white,
      letterSpacing: -0.2,
    },

    // Texto inativo (oculto para design minimalista)
    inactiveFloatingNavText: {
      fontSize: 0, // Esconde o texto nos inativos
      height: 0,
    },

    // Indicador de notificação
    floatingNotificationDot: {
      position: 'absolute',
      top: 6,
      right: '35%',
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: themeColors.error,
      borderWidth: 2,
      borderColor: themeColors.theme === 'dark' 
        ? 'rgba(26, 31, 37, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)',
    },

    // Espaçamento extra no final para não sobrepor content
    bottomSpacing: {
      height: Platform.OS === 'ios' ? 100 : 90,
    },
  });
};

export default createFloatingNavStyles;