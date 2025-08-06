import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const createStyles = () => {
  const themeColors = {
    primary: '#113334',
    secondary: '#FFD700',
    background: '#0F1419',
    cardBackground: '#1A1F2E',
    text: '#FFFFFF',
    textSecondary: '#8A9199',
    textTertiary: '#6C757D',
    darkGray: '#495057',
    mediumGray: '#6C757D',
    lightGray: '#F8F9FA',
    border: '#2A2F3E',
    shadow: '#000000',
    white: '#FFFFFF',
    error: '#DC3545',
    success: '#28A745',
    warning: '#FFC107',
    overlay: 'rgba(0, 0, 0, 0.6)',
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: height * 0.35,
      backgroundColor: themeColors.cardBackground,
    },
    newsImage: {
      width: '100%',
      height: '100%',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.cardBackground,
    },
    imageOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: 'rgba(15, 20, 25, 0.8)',
    },
    featuredBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: themeColors.secondary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    featuredBadgeText: {
      color: themeColors.primary,
      fontSize: 12,
      fontWeight: '600',
      marginLeft: 4,
    },
    newsContent: {
      backgroundColor: themeColors.background,
      paddingHorizontal: 20,
      paddingTop: 24,
      marginTop: -20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      minHeight: height * 0.65,
    },
    newsHeader: {
      marginBottom: 20,
    },
    categoryContainer: {
      marginBottom: 16,
    },
    categoryBadge: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    categoryText: {
      color: themeColors.white,
      fontSize: 14,
      fontWeight: '600',
    },
    metaInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    metaText: {
      color: themeColors.textSecondary,
      fontSize: 14,
      fontWeight: '500',
    },
    newsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      lineHeight: 32,
      marginBottom: 16,
      letterSpacing: -0.5,
    },
    newsSummary: {
      fontSize: 16,
      color: themeColors.textSecondary,
      lineHeight: 24,
      marginBottom: 24,
      fontWeight: '500',
    },
    separator: {
      height: 1,
      backgroundColor: themeColors.border,
      marginVertical: 24,
    },
    newsContentText: {
      fontSize: 16,
      color: themeColors.text,
      lineHeight: 26,
      marginBottom: 32,
      fontWeight: '400',
    },
    additionalInfo: {
      backgroundColor: themeColors.cardBackground,
      padding: 20,
      borderRadius: 16,
      marginBottom: 32,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 12,
    },
    infoText: {
      color: themeColors.textSecondary,
      fontSize: 14,
      fontWeight: '500',
      flex: 1,
    },
    actionButtons: {
      flexDirection: 'row',
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
      backgroundColor: themeColors.cardBackground,
      borderWidth: 1,
      borderColor: themeColors.border,
      gap: 8,
    },
    primaryActionButton: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
    },
    primaryActionButtonText: {
      color: themeColors.white,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    errorText: {
      fontSize: 16,
      color: themeColors.textSecondary,
      textAlign: 'center',
    },
  });
};

export default createStyles; 