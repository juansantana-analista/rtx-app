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
    investmentBreakdown: {
      marginBottom: 24,
    },
    investmentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border || themeColors.mediumGray,
    },
    flagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    flag: {
      fontSize: 20,
      marginRight: 12,
    },
    cryptoIcon: {
      fontSize: 20,
      marginRight: 12,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: 'bold',
    },
    investmentLabel: {
      fontSize: 16,
      color: themeColors.text,
      flex: 1,
      fontWeight: '500',
    },
    helpIcon: {
      marginLeft: 8,
      padding: 4,
      borderRadius: 12,
      backgroundColor: 'rgba(85, 184, 128, 0.1)', // Fundo sutil para melhor contraste
    },
    investmentAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    investUSA: {
      fontSize: 16,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
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
    brazilSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    brazilHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    brazilTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginRight: 8,
      letterSpacing: -0.2,
    },
    reorderButton: {
      marginLeft: 'auto',
    },
    reorderText: {
      fontSize: 14,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
    },
    periodSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    periodButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 24,
      marginRight: 12,
      backgroundColor: themeColors.lightGray,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    selectedPeriodButton: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    periodButtonText: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      fontWeight: '500',
    },
    selectedPeriodButtonText: {
      color: themeColors.theme === 'dark' ? themeColors.white : themeColors.white, // Mantém branco pois o fundo é azul
      fontWeight: 'bold',
    },
    updateInfo: {
      marginLeft: 'auto',
      alignItems: 'flex-end',
    },
    updateText: {
      fontSize: 10,
      color: themeColors.textTertiary || themeColors.darkGray,
      lineHeight: 12,
      fontWeight: '600',
    },
    chartContainer: {
      marginBottom: 30,
      paddingVertical: 20,
    },
    chartBar: {
      alignItems: 'center',
      marginRight: 15,
      width: 60,
    },
    bar: {
      width: 40,
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderRadius: 6,
      marginBottom: 8,
      minHeight: 20,
    },
    barAmount: {
      fontSize: 12,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
    },
    barMonth: {
      fontSize: 10,
      color: themeColors.textTertiary || themeColors.darkGray,
      fontWeight: '500',
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
  });
};

export default createStyles;