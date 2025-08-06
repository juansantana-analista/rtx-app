// styles/DeviceApprovalStyles.js
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
      paddingHorizontal: 20,
    },

    // Header da Tela
    headerSection: {
      alignItems: 'center',
      paddingVertical: 32,
      paddingHorizontal: 16,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: themeColors.lightGray,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: -0.3,
    },
    headerSubtitle: {
      fontSize: 16,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
      lineHeight: 22,
      paddingHorizontal: 16,
    },

    // Cards
    deviceInfoCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    instructionsCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    statusCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },

    // Informações do Dispositivo
    deviceInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border || themeColors.lightGray,
    },
    deviceInfoLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.textSecondary || themeColors.darkGray,
    },
    deviceInfoValue: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text,
      flex: 1,
      textAlign: 'right',
      marginLeft: 16,
    },

    // Instruções
    instructionItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    instructionNumber: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: themeColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      marginTop: 2,
    },
    instructionNumberText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    instructionContent: {
      flex: 1,
    },
    instructionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 6,
    },
    instructionDescription: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      lineHeight: 20,
    },

    // Seções
    photoSection: {
      marginBottom: 24,
    },
    justificationSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },

    // Upload de Foto
    photoUploadButton: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: themeColors.secondary,
      borderStyle: 'dashed',
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    photoUploadText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.secondary,
      marginTop: 16,
      textAlign: 'center',
    },
    photoUploadSubtext: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginTop: 8,
      textAlign: 'center',
      lineHeight: 18,
    },

    // Foto Anexada
    attachedPhotoContainer: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      position: 'relative',
    },
    attachedPhotoPreview: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: themeColors.lightGray,
    },
    attachedPhotoInfo: {
      alignItems: 'center',
    },
    attachedPhotoName: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 4,
    },
    attachedPhotoSize: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
    },
    removePhotoButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: themeColors.cardBackground,
      borderRadius: 20,
      padding: 4,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },

    // Input de Justificativa
    justificationInput: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: themeColors.text,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      minHeight: 120,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    characterCount: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'right',
      marginTop: 8,
    },

    // Status
    statusItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    statusContent: {
      flex: 1,
      marginLeft: 16,
    },
    statusTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
    },
    statusDescription: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      lineHeight: 18,
    },
    statusTimeline: {
      backgroundColor: themeColors.lightGray,
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
    },
    timelineTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 12,
    },
    timelineItem: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 6,
      lineHeight: 18,
    },

    // Instruções de Aguardo
    waitingInstructions: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    waitingText: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      lineHeight: 20,
      marginBottom: 12,
    },

    // Botões
    buttonsSection: {
      paddingVertical: 24,
      paddingBottom: 40,
    },
    primaryButton: {
      backgroundColor: themeColors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    primaryButtonDisabled: {
      backgroundColor: themeColors.darkGray,
      opacity: 0.6,
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.white,
      marginLeft: 8,
      letterSpacing: -0.1,
    },
    secondaryButton: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textSecondary || themeColors.darkGray,
      marginLeft: 8,
      letterSpacing: -0.1,
    },
  });
};

export default createStyles;