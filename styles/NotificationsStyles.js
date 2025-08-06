import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const createStyles = (themeColors, theme, showFloatingNav = true) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
    },

    notificationsList: {
      flex: 1,
    },
    notificationItem: {
      backgroundColor: themeColors.cardBackground,
      marginHorizontal: 20,
      marginVertical: 8,
      borderRadius: 12,
      padding: 16,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    notificationIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    notificationInfo: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 4,
    },
    notificationTime: {
      fontSize: 12,
      color: themeColors.textSecondary,
    },
    notificationContent: {
      marginBottom: 12,
    },
    notificationMessage: {
      fontSize: 14,
      color: themeColors.textSecondary,
      lineHeight: 20,
    },
    notificationFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    notificationCategory: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: themeColors.lightGray,
    },
    notificationCategoryText: {
      fontSize: 12,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    unreadIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: themeColors.secondary,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyIcon: {
      fontSize: 64,
      color: themeColors.textSecondary,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyMessage: {
      fontSize: 14,
      color: themeColors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    // Estilos para a tela de detalhes
    detailContainer: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    detailHeader: {
      backgroundColor: themeColors.cardBackground,
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    detailTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 8,
    },
    detailMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    detailTime: {
      fontSize: 14,
      color: themeColors.textSecondary,
      marginRight: 16,
    },
    detailCategory: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: themeColors.lightGray,
    },
    detailCategoryText: {
      fontSize: 12,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    detailContent: {
      flex: 1,
      padding: 20,
    },
    detailMessage: {
      fontSize: 16,
      color: themeColors.text,
      lineHeight: 24,
      marginBottom: 20,
    },
    detailActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    primaryActionButton: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text,
    },
    primaryActionButtonText: {
      color: themeColors.white,
    },
  });
};

export default createStyles; 