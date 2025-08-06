import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const createStyles = (themeColors, theme, showFloatingNav = true) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
      paddingBottom: showFloatingNav ? 100 : 20,
    },
    searchContainer: {
      padding: 20,
      paddingBottom: 10,
    },
    searchInput: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: themeColors.text,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    filtersContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    filterRow: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    filterButton: {
      backgroundColor: themeColors.cardBackground,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    filterButtonActive: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    filterButtonText: {
      fontSize: 14,
      color: themeColors.textSecondary,
    },
    filterButtonTextActive: {
      color: themeColors.white,
      fontWeight: '600',
    },
    vehiclesList: {
      flex: 1,
    },
    vehicleCard: {
      backgroundColor: themeColors.cardBackground,
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    vehicleImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    vehicleInfo: {
      padding: 16,
    },
    vehicleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    vehicleTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      flex: 1,
    },
    vehicleBadge: {
      backgroundColor: themeColors.success,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginLeft: 8,
    },
    vehicleBadgeText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    vehicleSubtitle: {
      fontSize: 14,
      color: themeColors.textSecondary,
      marginBottom: 8,
    },
    vehicleSpecs: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 12,
    },
    specItem: {
      backgroundColor: themeColors.background,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      marginRight: 8,
      marginBottom: 4,
    },
    specText: {
      fontSize: 12,
      color: themeColors.textSecondary,
    },
    vehicleFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    vehiclePrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.secondary,
    },
    vehiclePriceType: {
      fontSize: 12,
      color: themeColors.textSecondary,
    },
    vehicleActions: {
      flexDirection: 'row',
    },
    actionButton: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    actionButtonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: themeColors.primary,
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.white,
    },
    actionButtonTextSecondary: {
      color: themeColors.primary,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyStateIcon: {
      fontSize: 64,
      color: themeColors.textSecondary,
      marginBottom: 16,
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    emptyStateMessage: {
      fontSize: 14,
      color: themeColors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: themeColors.textSecondary,
      marginTop: 16,
    },
    // Hero Section Styles
    heroSection: {
      height: 280,
      position: 'relative',
      marginBottom: 20,
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: themeColors.primary,
    },
    heroGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    heroBadge: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: themeColors.secondary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      zIndex: 10,
    },
    heroBadgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    heroContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingTop: 60,
    },
    heroLogo: {
      width: 120,
      height: 60,
      marginBottom: 16,
    },
    heroLogoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.white,
      marginBottom: 12,
      letterSpacing: 2,
    },
    heroSubtitle: {
      fontSize: 16,
      color: themeColors.white,
      textAlign: 'center',
      lineHeight: 24,
      opacity: 0.9,
    },
    // Search Section Styles
    searchSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: themeColors.text,
      marginLeft: 12,
    },
    // Filters Section Styles
    filtersSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    filtersTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 12,
    },
    filtersRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    filterChip: {
      backgroundColor: themeColors.cardBackground,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: themeColors.border,
      marginBottom: 8,
    },
    filterChipActive: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    filterChipText: {
      fontSize: 14,
      color: themeColors.textSecondary,
    },
    filterChipTextActive: {
      color: themeColors.white,
      fontWeight: '600',
    },
    // Vehicles Section Styles
    vehiclesSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    sectionHeader: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
    },
  });
};

export default createStyles; 