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
      padding: 20,
      borderRadius: 12,
      shadowColor: themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    balance: {
      fontSize: 32,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 20,
    },
    investmentBreakdown: {
      marginBottom: 20,
    },
    investmentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.mediumGray,
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
      color: themeColors.secondary,
    },
    investmentLabel: {
      fontSize: 16,
      color: themeColors.text,
      flex: 1,
    },
    helpIcon: {
      marginLeft: 8,
    },
    investmentAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    investUSA: {
      fontSize: 16,
      color: themeColors.secondary,
      fontWeight: '500',
    },
    rescueSection: {
      borderTopWidth: 1,
      borderTopColor: themeColors.mediumGray,
      paddingTop: 16,
      position: 'relative',
    },
    rescueLabel: {
      fontSize: 14,
      color: themeColors.darkGray,
      marginBottom: 8,
    },
    rescueHelp: {
      position: 'absolute',
      top: 16,
      right: 0,
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
    },
    rescueButton: {
      fontSize: 16,
      color: themeColors.secondary,
      fontWeight: '500',
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
    },
    reorderButton: {
      marginLeft: 'auto',
    },
    reorderText: {
      fontSize: 14,
      color: themeColors.secondary,
      fontWeight: '500',
    },
    periodSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    periodButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 12,
      backgroundColor: themeColors.lightGray,
    },
    selectedPeriodButton: {
      backgroundColor: themeColors.primary,
    },
    periodButtonText: {
      fontSize: 14,
      color: themeColors.darkGray,
    },
    selectedPeriodButtonText: {
      color: themeColors.white,
      fontWeight: 'bold',
    },
    updateInfo: {
      marginLeft: 'auto',
      alignItems: 'flex-end',
    },
    updateText: {
      fontSize: 10,
      color: themeColors.darkGray,
      lineHeight: 12,
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
      backgroundColor: themeColors.secondary,
      borderRadius: 4,
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
      color: themeColors.darkGray,
    },
    investmentTypesList: {
      marginTop: 20,
    },
    investmentTypeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.mediumGray,
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
    },
    percentageText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.darkGray,
    },
    investmentTypeName: {
      fontSize: 16,
      color: themeColors.text,
      fontWeight: '500',
    },
  });
};

export default createStyles;