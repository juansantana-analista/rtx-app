import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const createStyles = (themeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },

    // Indicador de Passos
    stepIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 24,
      marginBottom: 20,
    },
    stepIndicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stepCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    stepNumber: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    stepLine: {
      width: 40,
      height: 2,
      marginHorizontal: 8,
    },

    // Container do Passo
    stepContainer: {
      marginBottom: 24,
    },
    stepTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    stepSubtitle: {
      fontSize: 16,
      color: themeColors.textSecondary,
      marginBottom: 24,
      lineHeight: 22,
    },

    // Seções do Formulário
    formSection: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },

    // Inputs
    inputGroup: {
      marginBottom: 20,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 8,
    },
    textInput: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: themeColors.text,
      borderWidth: 1,
      borderColor: themeColors.border,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },

    // Input de Valor
    currencyInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.border,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    currencySymbol: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      paddingLeft: 16,
      paddingRight: 8,
    },
    currencyInput: {
      flex: 1,
      paddingVertical: 14,
      paddingRight: 16,
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
    },

    // Cards de Produto
    productCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: themeColors.border,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      position: 'relative',
    },
    selectedProductCard: {
      borderColor: themeColors.success,
      borderWidth: 2,
      backgroundColor: themeColors.theme === 'dark' 
        ? 'rgba(40, 167, 69, 0.1)' 
        : 'rgba(40, 167, 69, 0.05)',
    },
    productHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    productIndicator: {
      width: 6,
      height: 60,
      borderRadius: 3,
      marginRight: 16,
    },
    productInfo: {
      flex: 1,
      marginRight: 16,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    productTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textSecondary,
      marginBottom: 6,
    },
    productDescription: {
      fontSize: 14,
      color: themeColors.textSecondary,
      lineHeight: 20,
    },
    productMeta: {
      alignItems: 'flex-end',
    },
    productYield: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.success,
      marginBottom: 4,
    },
    productRisk: {
      fontSize: 12,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },
    productLimits: {
      borderTopWidth: 1,
      borderTopColor: themeColors.border,
      paddingTop: 12,
    },
    productLimitText: {
      fontSize: 12,
      color: themeColors.textSecondary,
      fontWeight: '500',
      textAlign: 'center',
    },
    selectedIndicator: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      borderRadius: 20,
      padding: 4,
    },

    // Seção de Valor
    amountSection: {
      backgroundColor: themeColors.lightGray,
      borderRadius: 16,
      padding: 20,
      marginTop: 20,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    amountLimits: {
      alignItems: 'center',
      marginTop: 12,
    },
    limitText: {
      fontSize: 14,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },

    // Cards de Resumo
    summaryCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: themeColors.border,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    summaryLabel: {
      fontSize: 14,
      color: themeColors.textSecondary,
      fontWeight: '500',
      flex: 1,
    },
    summaryValue: {
      fontSize: 14,
      color: themeColors.text,
      fontWeight: '600',
      flex: 2,
      textAlign: 'right',
    },

    // Seção do Contrato
    contractSection: {
      marginTop: 20,
    },
    contractTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },
    contractScroll: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      maxHeight: 200,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    contractText: {
      fontSize: 14,
      color: themeColors.text,
      lineHeight: 20,
      fontWeight: '400',
    },

    // Checkbox
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: themeColors.border,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
    },
    checkboxChecked: {
      backgroundColor: themeColors.success,
      borderColor: themeColors.success,
    },
    checkboxText: {
      fontSize: 14,
      color: themeColors.text,
      lineHeight: 20,
      flex: 1,
      fontWeight: '500',
    },

    // Botões
    buttonSection: {
      paddingVertical: 20,
    },
    nextButton: {
      backgroundColor: themeColors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    nextButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.white,
      marginRight: 8,
      letterSpacing: -0.2,
    },
    submitButton: {
      backgroundColor: themeColors.success,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: themeColors.success,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    submitButtonDisabled: {
      backgroundColor: themeColors.textSecondary,
      shadowOpacity: 0,
    },
    submitButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.white,
      marginLeft: 8,
      letterSpacing: -0.2,
    },
  });
};

export default createStyles;