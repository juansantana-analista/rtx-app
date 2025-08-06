import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

const { width } = Dimensions.get('window');

const createStyles = () => {
  const { theme, themeColors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    balanceCard: {
      backgroundColor: themeColors.cardBackground,
      margin: 20,
      padding: 24,
      borderRadius: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    balanceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    balanceInfo: {
      flex: 1,
    },
    balanceLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.textSecondary || themeColors.darkGray,
      letterSpacing: 0.5,
      marginBottom: 4,
      textTransform: 'uppercase',
    },
    balanceAmount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: themeColors.text,
      letterSpacing: -0.5,
    },
    balanceActions: {
      flexDirection: 'row',
      gap: 16,
    },
    balanceActionButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: 'rgba(85, 184, 128, 0.1)', // Fundo sutil para os botões de ação
    },
    balanceCardActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    accessWallet: {
      flex: 1,
    },
    accessWalletText: {
      color: themeColors.accent || themeColors.secondary,
      fontSize: 16,
      fontWeight: '600',
    },
    addBalanceButton: {
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    addBalanceText: {
      color: themeColors.white,
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 4,
    },
    menuGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    menuItem: {
      width: (width - 60) / 4,
      alignItems: 'center',
      marginBottom: 20,
    },
    menuIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: themeColors.lightGray,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      position: 'relative',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    badge: {
      position: 'absolute',
      top: -6,
      right: -6,
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderWidth: 2,
      borderColor: themeColors.background,
    },
    badgeText: {
      color: themeColors.white,
      fontSize: 10,
      fontWeight: 'bold',
    },
    menuTitle: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.text,
      textAlign: 'center',
      lineHeight: 16,
      fontWeight: '500',
    },
    promoSection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    participationCard: {
      backgroundColor: theme === 'dark' ? themeColors.cardBackground : themeColors.primary, // Fundo escuro no tema escuro, azul no tema claro
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    participationContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    participationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.white,
      letterSpacing: -0.3,
      textAlign: 'center',
    },

    opportunitiesSection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 20,
      letterSpacing: -0.2,
    },
    investmentCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    investmentInfo: {
      flex: 1,
    },
    investmentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    investmentTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: themeColors.text,
      letterSpacing: -0.1,
    },
    investmentAmount: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 8,
    },
    investmentDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    investmentDueDate: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
    },
    investmentYield: {
      fontSize: 16,
      fontWeight: '400',
    },
    emptyInvestments: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyInvestmentsText: {
      fontSize: 16,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
      marginBottom: 20,
    },
    newInvestmentButton: {
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderRadius: 24,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    newInvestmentButtonText: {
      color: themeColors.white,
      fontSize: 14,
      fontWeight: 'bold',
    },
    // Estilos para a seção de notícias
    newsSection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    newsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    seeAllButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.secondary,
    },
    newsScrollContent: {
      paddingRight: 20,
    },
    newsCard: {
      width: 280,
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      marginRight: 12,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      overflow: 'hidden',
    },
    newsImage: {
      width: '100%',
      height: 120,
    },
    newsCardContent: {
      padding: 16,
    },
    newsCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    newsCategory: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.secondary,
      backgroundColor: 'rgba(85, 184, 128, 0.1)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      textTransform: 'uppercase',
    },
    newsTime: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
    },
    newsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      lineHeight: 22,
      marginBottom: 12,
      flex: 1,
    },
    newsCardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    newsReadTime: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
    },
    // Estilos para estados de loading, erro e vazio das notícias
    newsLoading: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    newsLoadingText: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
    },
    newsError: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    newsErrorText: {
      fontSize: 14,
      color: themeColors.error,
      textAlign: 'center',
    },
    newsEmpty: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    newsEmptyText: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
    },
  });
};

export default createStyles;