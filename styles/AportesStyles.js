import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

const { width } = Dimensions.get('window');

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
    
    // Card de Saldo
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
      alignItems: 'center',
    },
    balanceLabel: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 8,
      fontWeight: '500',
    },
    balanceAmount: {
      fontSize: 28,
      fontWeight: 'bold',
      color: themeColors.accent || themeColors.secondary,
      letterSpacing: -0.5,
    },

    // Seções
    section: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },

    // Seletor de Produto
    productSelector: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    productSelectorPlaceholder: {
      fontSize: 16,
      color: themeColors.darkGray,
      fontWeight: '500',
    },
    selectedProductDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    selectedProductInfo: {
      flex: 1,
    },
    selectedProductTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 2,
    },
    selectedProductSubtitle: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 2,
    },
    selectedProductYield: {
      fontSize: 14,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
    },

    // Descrição do Produto
    productDescriptionCard: {
      backgroundColor: themeColors.lightGray,
      borderRadius: 12,
      padding: 16,
      marginTop: 12,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    productDescription: {
      fontSize: 14,
      color: themeColors.text,
      lineHeight: 20,
      marginBottom: 12,
      fontWeight: '400',
    },
    productRequirements: {
      marginTop: 8,
    },
    requirementText: {
      fontSize: 13,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 4,
      fontWeight: '500',
    },

    // Input de Valor
    amountInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: themeColors.border || themeColors.mediumGray,
      paddingHorizontal: 16,
      paddingVertical: 4,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    currencySymbol: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      marginRight: 8,
    },
    amountInput: {
      flex: 1,
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      paddingVertical: 16,
    },

    // Validação do Valor
    amountValidation: {
      marginTop: 12,
      alignItems: 'center',
    },
    validationError: {
      fontSize: 14,
      color: themeColors.error,
      fontWeight: '600',
    },
    validationSuccess: {
      fontSize: 14,
      color: themeColors.success,
      fontWeight: '600',
    },

    // Valores Sugeridos
    suggestedAmounts: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    suggestedAmountButton: {
      backgroundColor: themeColors.lightGray,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    suggestedAmountText: {
      fontSize: 14,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
    },

    // Card de Resumo
    summaryCard: {
      backgroundColor: themeColors.cardBackground,
      margin: 20,
      padding: 20,
      borderRadius: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
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
    },
    summaryLabel: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      fontWeight: '500',
    },
    summaryValue: {
      fontSize: 14,
      color: themeColors.text,
      fontWeight: '600',
    },
    summaryTotal: {
      borderTopWidth: 1,
      borderTopColor: themeColors.border || themeColors.mediumGray,
      marginTop: 8,
      paddingTop: 12,
    },
    summaryTotalLabel: {
      fontSize: 16,
      color: themeColors.text,
      fontWeight: 'bold',
    },
    summaryTotalValue: {
      fontSize: 16,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: 'bold',
    },

    // Seção do Botão (dentro do ScrollView)
    contributeSection: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 20,
    },
    contributeButton: {
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderRadius: 12,
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    contributeButtonDisabled: {
      backgroundColor: themeColors.darkGray,
      opacity: 0.6,
    },
    contributeButtonText: {
      color: themeColors.white,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 8,
      letterSpacing: -0.2,
    },

    // Modal
    modalContainer: {
      flex: 1,
      backgroundColor: themeColors.background,
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
      letterSpacing: -0.3,
    },
    modalCloseButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: themeColors.lightGray,
    },
    modalContent: {
      flex: 1,
      padding: 20,
    },

    // Itens do Produto no Modal
    productItem: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    selectedProductItem: {
      borderColor: themeColors.accent || themeColors.secondary,
      borderWidth: 2,
      backgroundColor: themeColors.theme === 'dark' 
        ? 'rgba(85, 184, 128, 0.1)' 
        : 'rgba(85, 184, 128, 0.05)',
    },
    productIndicator: {
      width: 8,
      height: 40,
      borderRadius: 4,
      marginRight: 16,
    },
    productInfo: {
      flex: 1,
    },
    productTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
      letterSpacing: -0.1,
    },
    productSubtitle: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 4,
    },
    productYield: {
      fontSize: 14,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
      marginBottom: 8,
    },
    productDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    productDetail: {
      fontSize: 12,
      color: themeColors.textTertiary || themeColors.darkGray,
      fontWeight: '500',
    },
  });
};

export default createStyles;