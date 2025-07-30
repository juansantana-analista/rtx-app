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

    // Card de Resumo
    summaryCard: {
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
    summaryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 20,
      letterSpacing: -0.2,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    summaryItem: {
      flex: 1,
      alignItems: 'center',
    },
    summaryLabel: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 8,
      fontWeight: '500',
    },
    summaryValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
      letterSpacing: -0.3,
    },
    summaryHighlight: {
      color: themeColors.accent || themeColors.secondary,
    },
    summaryYield: {
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    yieldItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    yieldLabel: {
      fontSize: 16,
      color: themeColors.success,
      fontWeight: '600',
      marginLeft: 8,
    },
    yieldAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.success,
      letterSpacing: -0.2,
    },

    // Filtros
    filtersSection: {
      paddingVertical: 16,
    },
    filtersContainer: {
      paddingHorizontal: 20,
    },
    filterButton: {
      backgroundColor: themeColors.lightGray,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 12,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    filterButtonActive: {
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderColor: themeColors.accent || themeColors.secondary,
    },
    filterButtonText: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      fontWeight: '500',
    },
    filterButtonTextActive: {
      color: themeColors.white,
      fontWeight: '600',
    },

    // Lista de Investimentos
    investmentsList: {
      paddingHorizontal: 20,
    },
    investmentCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },

    // Header do Card
    investmentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    investmentTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    productIndicator: {
      width: 6,
      height: 40,
      borderRadius: 3,
      marginRight: 12,
    },
    investmentTitleInfo: {
      flex: 1,
    },
    investmentProduct: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      letterSpacing: -0.1,
    },
    investmentRisk: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginTop: 2,
      fontWeight: '500',
    },
    investmentStatus: {
      alignItems: 'flex-end',
    },
    statusBadge: {
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },

    // Valores
    investmentValues: {
      marginBottom: 16,
    },
    valueRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 4,
    },
    valueLabel: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      fontWeight: '500',
    },
    valueAmount: {
      fontSize: 14,
      color: themeColors.text,
      fontWeight: '600',
    },
    currentValue: {
      color: themeColors.accent || themeColors.secondary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    yieldValue: {
      color: themeColors.success,
      fontWeight: 'bold',
    },

    // Progresso
    progressSection: {
      marginBottom: 16,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    progressLabel: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      fontWeight: '500',
    },
    progressPercentage: {
      fontSize: 14,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: 'bold',
    },
    progressBar: {
      height: 8,
      backgroundColor: themeColors.lightGray,
      borderRadius: 4,
      marginBottom: 8,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
    progressInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressText: {
      fontSize: 12,
      color: themeColors.textTertiary || themeColors.darkGray,
      fontWeight: '500',
    },

    // Datas
    datesSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: themeColors.border || themeColors.mediumGray,
    },
    dateItem: {
      alignItems: 'center',
    },
    dateLabel: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 4,
      fontWeight: '500',
    },
    dateValue: {
      fontSize: 14,
      color: themeColors.text,
      fontWeight: '600',
    },

    // Rendimento Mensal
    monthlyYieldSection: {
      marginBottom: 16,
    },
    monthlyYieldItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    monthlyYieldText: {
      fontSize: 14,
      color: themeColors.success,
      fontWeight: '600',
      marginLeft: 8,
    },

    // Botões de Ação
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    detailsButton: {
      flex: 1,
      backgroundColor: themeColors.lightGray,
      borderRadius: 8,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    detailsButtonText: {
      fontSize: 14,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
      marginLeft: 6,
    },
    rescueButton: {
      flex: 1,
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderRadius: 8,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rescueButtonDisabled: {
      backgroundColor: themeColors.darkGray,
      opacity: 0.6,
    },
    rescueButtonText: {
      fontSize: 14,
      color: themeColors.white,
      fontWeight: '600',
      marginLeft: 6,
    },
    rescueButtonTextDisabled: {
      color: themeColors.darkGray,
    },

    // Estado Vazio
    emptyState: {
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    emptyStateText: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
      lineHeight: 20,
      paddingHorizontal: 40,
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

    // Modal de Resgate
    rescueInvestmentInfo: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    rescueInvestmentTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 8,
    },
    rescueInvestmentValue: {
      fontSize: 16,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
      marginBottom: 4,
    },
    rescueInvestmentYield: {
      fontSize: 16,
      color: themeColors.success,
      fontWeight: '600',
    },

    // Opções de Resgate
    rescueOptions: {
      marginBottom: 24,
    },
    rescueOptionsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
    },
    rescueOptionButton: {
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
    rescueOptionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: themeColors.accent || themeColors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    rescueOptionInfo: {
      flex: 1,
    },
    rescueOptionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
    },
    rescueOptionDescription: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 6,
      lineHeight: 18,
    },
    rescueOptionValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.accent || themeColors.secondary,
    },

    // Informações do Resgate
    rescueInfo: {
      backgroundColor: themeColors.lightGray,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    rescueInfoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 12,
    },
    rescueInfoText: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 8,
      lineHeight: 20,
    },
  });
};

export default createStyles;