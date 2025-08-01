import { StyleSheet } from 'react-native';

export const createStyles = (themeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  
  // Cabeçalho do Extrato
  extractHeader: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: themeColors.border || themeColors.mediumGray,
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.white,
    letterSpacing: 1,
  },
  extractTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  extractSubtitle: {
    fontSize: 14,
    color: themeColors.textSecondary || themeColors.darkGray,
    textAlign: 'center',
    marginBottom: 12,
  },
  extractDate: {
    fontSize: 12,
    color: themeColors.textTertiary || themeColors.mediumGray,
    textAlign: 'center',
  },

  // Informações do Cliente
  clientInfo: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: themeColors.border || themeColors.mediumGray,
  },
  clientInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  clientInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border || themeColors.lightGray,
  },
  clientInfoLabel: {
    fontSize: 14,
    color: themeColors.textSecondary || themeColors.darkGray,
    fontWeight: '500',
  },
  clientInfoValue: {
    fontSize: 14,
    color: themeColors.text,
    fontWeight: '600',
  },

  // Resumo Financeiro
  financialSummary: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: themeColors.border || themeColors.mediumGray,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border || themeColors.lightGray,
  },
  summaryLabel: {
    fontSize: 14,
    color: themeColors.textSecondary || themeColors.darkGray,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    color: themeColors.text,
    fontWeight: 'bold',
  },

  // Seção de Transações
  transactionsSection: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: themeColors.border || themeColors.mediumGray,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border || themeColors.lightGray,
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
  transactionType: {
    fontSize: 12,
    color: themeColors.textTertiary || themeColors.mediumGray,
    fontWeight: '500',
  },
  transactionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionPercentage: {
    fontSize: 12,
    color: themeColors.secondary,
    fontWeight: '600',
    marginBottom: 4,
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

  // Rodapé
  footer: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: themeColors.border || themeColors.mediumGray,
  },
  footerText: {
    fontSize: 12,
    color: themeColors.textSecondary || themeColors.darkGray,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
  },

  // Botões de Ação
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadButton: {
    backgroundColor: themeColors.secondary,
  },
  shareButton: {
    backgroundColor: themeColors.cardBackground,
    borderWidth: 2,
    borderColor: themeColors.secondary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.white,
    marginLeft: 8,
  },
}); 