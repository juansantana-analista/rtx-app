import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

const { width, height } = Dimensions.get('window');

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

    // Tela de Instruções
    instructionsContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
      alignItems: 'center',
    },
    iconContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    deviceIcon: {
      position: 'relative',
      backgroundColor: themeColors.lightGray,
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    shieldIcon: {
      position: 'absolute',
      bottom: -3,
      right: -3,
      backgroundColor: themeColors.success,
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: themeColors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 20,
      paddingHorizontal: 10,
    },

    // Card de Instruções
    instructionsCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      width: '100%',
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    instructionsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    instructionsList: {
      gap: 12,
    },
    instructionItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    stepNumber: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: themeColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    stepNumberText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    instructionContent: {
      flex: 1,
    },
    instructionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 2,
    },
    instructionDescription: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
      lineHeight: 16,
    },

    // Informações de Segurança
    securityInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      width: '100%',
    },
    securityText: {
      fontSize: 12,
      color: themeColors.success,
      marginLeft: 8,
      flex: 1,
      fontWeight: '500',
    },



    // Botões de Ação
    actionButtons: {
      width: '100%',
      gap: 12,
    },
    startButton: {
      backgroundColor: themeColors.success,
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    startButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.white,
      marginLeft: 6,
    },
    logoutButton: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    logoutButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.textSecondary || themeColors.darkGray,
    },

    // Tela da Câmera
    cameraContainer: {
      flex: 1,
      backgroundColor: themeColors.black,
    },
    camera: {
      flex: 1,
    },
    cameraOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
    },
    cameraHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    cameraBackButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.white,
      textAlign: 'center',
    },
    cameraFlipButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraGuide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    faceGuide: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: themeColors.white,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      gap: 16,
    },
    guideText: {
      fontSize: 16,
      color: themeColors.white,
      textAlign: 'center',
      fontWeight: '600',
      paddingHorizontal: 20,
    },
    cameraFooter: {
      paddingBottom: 60,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: themeColors.white,
    },
    captureButtonInner: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: themeColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    captureLoading: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: themeColors.white,
      opacity: 0.5,
    },


    // Tela sem permissão
    cameraText: {
      fontSize: 18,
      color: themeColors.white,
      textAlign: 'center',
      marginBottom: 20,
    },
    permissionButton: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    permissionButtonText: {
      color: themeColors.white,
      fontSize: 16,
      fontWeight: '600',
    },

    // Tela de Foto Capturada
    photoContainer: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    photoHeader: {
      paddingHorizontal: 20,
      paddingVertical: 30,
      alignItems: 'center',
    },
    photoTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 8,
    },
    photoSubtitle: {
      fontSize: 16,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
    },
    photoPreview: {
      flex: 1,
      margin: 20,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: themeColors.lightGray,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    photoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    photoActions: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 30,
      gap: 16,
    },
    retakeButton: {
      flex: 1,
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors.primary,
    },
    retakeButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.primary,
      marginLeft: 8,
    },
    submitButton: {
      flex: 1,
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
    submitButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.white,
      marginLeft: 8,
    },

    // Telas de Status
    statusContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
      backgroundColor: themeColors.background,
    },
    statusIcon: {
      marginBottom: 24,
    },
    loadingSpinner: {
      backgroundColor: themeColors.lightGray,
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    waitingIcon: {
      backgroundColor: 'rgba(255, 149, 0, 0.1)',
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#FF9500',
    },
    statusTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    statusDescription: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 24,
    },

    // Informações de Espera
    waitingInfo: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 24,
      width: '100%',
      marginBottom: 32,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    infoText: {
      fontSize: 14,
      color: themeColors.text,
      marginLeft: 12,
      fontWeight: '500',
    },
    waitingButton: {
      backgroundColor: 'transparent',
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    waitingButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textSecondary || themeColors.darkGray,
    },
  });
};

export default createStyles;