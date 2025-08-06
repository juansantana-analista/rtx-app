import { StyleSheet } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

const createStyles = () => {
  const { themeColors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
      backgroundColor: themeColors.background,
    },

    // Container Principal
    statusContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },

    // Card de Status
    statusCard: {
      borderRadius: 20,
      padding: 32,
      alignItems: 'center',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    statusIcon: {
      marginBottom: 20,
      padding: 16,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    statusTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: -0.3,
    },
    statusDescription: {
      fontSize: 16,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
      lineHeight: 24,
      paddingHorizontal: 16,
    },

    // Card de Informações
    infoCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border || themeColors.lightGray,
    },
    infoLabel: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 14,
      color: themeColors.text,
      fontWeight: '600',
    },

    // Card de Instruções
    instructionsCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    instructionsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },
    instructionsList: {
      gap: 12,
    },
    instructionItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 4,
    },
    instructionText: {
      fontSize: 14,
      color: themeColors.text,
      marginLeft: 12,
      flex: 1,
      lineHeight: 20,
      fontWeight: '500',
    },

    // Botões de Ação
    actionButtons: {
      gap: 12,
      marginBottom: 24,
    },
    refreshButton: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: themeColors.primary,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    refreshButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.primary,
      marginLeft: 8,
    },
    retryButton: {
      backgroundColor: themeColors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: themeColors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    retryButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.white,
      marginLeft: 8,
    },
    supportButton: {
      backgroundColor: 'transparent',
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors.secondary,
    },
    supportButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.secondary,
      marginLeft: 8,
    },

    // Informação da Última Verificação
    lastCheckInfo: {
      alignItems: 'center',
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: themeColors.border || themeColors.lightGray,
    },
    lastCheckText: {
      fontSize: 12,
      color: themeColors.textTertiary || themeColors.darkGray,
      fontWeight: '500',
    },
  });
};

export default createStyles;