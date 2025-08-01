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
  
  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: themeColors.textSecondary || themeColors.darkGray,
    marginTop: 16,
    textAlign: 'center',
  },

  // Header Institucional
  institutionalHeader: {
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: themeColors.textSecondary || themeColors.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Container de Escritórios
  officesContainer: {
    marginBottom: 20,
  },

  // Card do Escritório
  officeCard: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: themeColors.border || themeColors.mediumGray,
    overflow: 'hidden',
  },

  // Imagem do Escritório
  officeImageContainer: {
    position: 'relative',
    height: 200,
  },
  officeImage: {
    width: '100%',
    height: '100%',
  },
  officeImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  officeStatus: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: themeColors.cardBackground,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: themeColors.text,
  },

  // Informações do Escritório
  officeInfo: {
    padding: 20,
  },
  officeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 16,
  },

  // Seção de Contatos
  contactSection: {
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  contactText: {
    fontSize: 14,
    color: themeColors.textSecondary || themeColors.darkGray,
    marginLeft: 8,
    flex: 1,
  },

  // Botões de Ação
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  whatsappButton: {
    backgroundColor: themeColors.success,
  },
  callButton: {
    backgroundColor: themeColors.secondary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: themeColors.white,
    marginLeft: 6,
  },

  // Estado Vazio
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: themeColors.textSecondary || themeColors.darkGray,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.cardBackground,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeColors.secondary,
  },
  refreshButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: themeColors.secondary,
    marginLeft: 8,
  },

  // Informações Adicionais
  additionalInfo: {
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
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  additionalInfoText: {
    fontSize: 14,
    color: themeColors.textSecondary || themeColors.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 