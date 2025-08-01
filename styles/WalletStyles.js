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
    balance: {
      fontSize: 32,
      fontWeight: 'bold',
      color: themeColors.text,
      letterSpacing: -0.5,
    },
    balanceLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.textSecondary || themeColors.darkGray,
      letterSpacing: 0.5,
      marginBottom: 4,
      textTransform: 'uppercase',
    },
    balanceInfo: {
      flex: 1,
    },
    balanceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    balanceVisibilityButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: 'rgba(85, 184, 128, 0.1)', // Fundo sutil para melhor contraste
    },
    newAporteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.success,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      marginBottom: 24,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    newAporteButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.white,
      marginLeft: 8,
    },

    // Seção de Investimentos
    investmentsSection: {
      marginBottom: 10,
      paddingBottom: 10,
    },
    investmentsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: 20,
    },
    investmentsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    investmentsScroll: {
      paddingLeft: 20,
      paddingBottom: 10,
    },
    investmentsScrollContent: {
      paddingRight: 20,
      paddingBottom: 10,
    },

    // Cartão de Investimento
    investmentCard: {
      width: 280,
      height: 220,
      borderRadius: 16,
      padding: 20,
      marginRight: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
      justifyContent: 'space-between',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    companyLogo: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    companyLogoText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    cardStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 4,
    },
    statusText: {
      fontSize: 10,
      fontWeight: '600',
      color: themeColors.white,
    },
    productName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.white,
      marginTop: 8,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    investedAmount: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.white,
      flex: 1,
    },
    eyeButton: {
      padding: 4,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    investmentInfo: {
      marginTop: 12,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    infoLabel: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    infoValue: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.white,
    },


    rescueSection: {
      borderTopWidth: 1,
      borderTopColor: themeColors.border || themeColors.mediumGray,
      paddingTop: 20,
      position: 'relative',
    },
    rescueLabel: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 8,
      fontWeight: '500',
    },
    rescueHelp: {
      position: 'absolute',
      top: 20,
      right: 0,
      padding: 4,
      borderRadius: 12,
      backgroundColor: 'rgba(85, 184, 128, 0.1)', // Fundo sutil para melhor contraste
    },
    rescueRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rescueAmountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    rescueBalanceVisibilityButton: {
      padding: 4,
      marginLeft: 8,
      borderRadius: 6,
      backgroundColor: 'rgba(85, 184, 128, 0.1)',
    },
    rescueAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      letterSpacing: -0.2,
    },
    rescueButton: {
      fontSize: 16,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
    },

    investmentTypesList: {
      marginTop: 20,
    },
    investmentTypeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border || themeColors.mediumGray,
      backgroundColor: themeColors.cardBackground,
      marginBottom: 8,
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    investmentTypeLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    percentageCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: themeColors.lightGray,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      borderWidth: 2,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    percentageText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    investmentTypeName: {
      fontSize: 16,
      color: themeColors.text,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    extractSection: {
      backgroundColor: themeColors.cardBackground,
      margin: 20,
      marginTop: 10,
      borderRadius: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      overflow: 'hidden',
    },
    extractHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border || themeColors.mediumGray,
    },
    extractTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      letterSpacing: -0.2,
    },
    printButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(85, 184, 128, 0.1)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    printButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.secondary,
      marginLeft: 6,
    },
    extractList: {
      paddingHorizontal: 20,
    },
    transactionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border || themeColors.mediumGray,
    },
    transactionLeft: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 4,
    },
    transactionDate: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 2,
    },
    transactionPercentage: {
      fontSize: 12,
      color: themeColors.success,
      fontWeight: '600',
    },
    transactionRight: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    positiveAmount: {
      color: themeColors.success,
    },
    negativeAmount: {
      color: themeColors.error,
    },

    // Modal de Resgate
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: themeColors.cardBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 20,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border || themeColors.mediumGray,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    closeButton: {
      padding: 4,
    },
    modalBody: {
      padding: 20,
    },
    availableBalanceLabel: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 8,
    },
    availableBalanceAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 24,
    },
    amountLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 12,
    },
    amountInput: {
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      borderRadius: 12,
      padding: 16,
      fontSize: 18,
      color: themeColors.text,
      backgroundColor: themeColors.background,
      marginBottom: 24,
    },
    percentageLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 12,
    },
    percentageButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    percentageButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      backgroundColor: themeColors.background,
      marginHorizontal: 4,
      alignItems: 'center',
    },
    selectedPercentageButton: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    percentageButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text,
    },
    selectedPercentageButtonText: {
      color: themeColors.white,
    },
    modalFooter: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      backgroundColor: themeColors.background,
      alignItems: 'center',
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
    },
    confirmButton: {
      flex: 1,
      paddingVertical: 16,
      borderRadius: 12,
      backgroundColor: themeColors.success,
      alignItems: 'center',
    },
    confirmButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.white,
    },

    // Estilos compartilhados para modais
    successIconContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    successIconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: themeColors.success,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: themeColors.success,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    successTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 28,
    },
    successAmount: {
      fontSize: 28,
      fontWeight: 'bold',
      color: themeColors.success,
      marginBottom: 20,
      textAlign: 'center',
    },
    successMessage: {
      fontSize: 16,
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 22,
    },
    successInfo: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
    },
  });
};

export default createStyles;