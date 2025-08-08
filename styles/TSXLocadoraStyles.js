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

    // Hero Section - Corrigido
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
      marginBottom: 32,
    },
    heroStats: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    heroStatItem: {
      alignItems: 'center',
      flex: 1,
    },
    heroStatNumber: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors.white,
      marginBottom: 4,
    },
    heroStatLabel: {
      fontSize: 12,
      color: themeColors.white,
      opacity: 0.8,
      fontWeight: '500',
    },
    heroStatDivider: {
      width: 1,
      height: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      marginHorizontal: 16,
    },

    // Search Section - Enhanced
    searchSection: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      backgroundColor: themeColors.background,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: themeColors.border,
      shadowColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 4,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: themeColors.text,
      marginLeft: 12,
      fontWeight: '500',
    },

    // Filters Section - Modern Design
    filtersSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    filtersTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 12,
      letterSpacing: -0.3,
    },
    categoriesList: {
      paddingRight: 20,
    },
    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.cardBackground,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 25,
      marginRight: 12,
      borderWidth: 1.5,
      borderColor: themeColors.border,
      shadowColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    categoryChipActive: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
      shadowColor: themeColors.primary,
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
      transform: [{ scale: 1.05 }],
    },
    categoryChipText: {
      fontSize: 14,
      color: themeColors.textSecondary,
      marginLeft: 6,
      fontWeight: '600',
    },
    categoryChipTextActive: {
      color: themeColors.white,
    },
    priceFiltersList: {
      paddingRight: 20,
    },
    priceFilterChip: {
      backgroundColor: themeColors.cardBackground,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 12,
      borderWidth: 1.5,
      borderColor: themeColors.border,
    },
    priceFilterChipActive: {
      backgroundColor: themeColors.secondary,
      borderColor: themeColors.secondary,
    },
    priceFilterText: {
      fontSize: 14,
      color: themeColors.textSecondary,
      fontWeight: '600',
    },
    priceFilterTextActive: {
      color: themeColors.white,
    },

    // Vehicles Section - Enhanced
    vehiclesSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors.text,
      letterSpacing: -0.5,
    },
    resultsBadge: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    resultsText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.white,
    },

    // Vehicle Cards - Completely Redesigned
    vehiclesList: {
      paddingBottom: 20,
    },
    vehicleCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 20,
      marginBottom: 20,
      overflow: 'hidden',
      shadowColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    vehicleImageContainer: {
      position: 'relative',
      height: 220,
    },
    vehicleImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    imageOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    vehicleBadge: {
      position: 'absolute',
      top: 16,
      left: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 4,
    },
    vehicleBadgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000',
      letterSpacing: 0.5,
    },
    availabilityIndicator: {
      position: 'absolute',
      top: 16,
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
    },
    availabilityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    availabilityText: {
      fontSize: 11,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    priceOverlay: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
    },
    overlayPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    overlayPriceType: {
      fontSize: 11,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      marginTop: 2,
    },

    // Vehicle Info Section - Enhanced
    vehicleInfo: {
      padding: 20,
    },
    vehicleHeader: {
      marginBottom: 16,
    },
    vehicleTitleSection: {
      flex: 1,
    },
    vehicleBrand: {
      fontSize: 14,
      color: themeColors.textSecondary,
      fontWeight: '600',
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    vehicleTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
      letterSpacing: -0.5,
    },
    vehicleSubtitle: {
      fontSize: 16,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },

    // Specs Chips - New Design
    vehicleSpecs: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 16,
      gap: 8,
    },
    specChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(17, 51, 52, 0.1)',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(17, 51, 52, 0.2)',
    },
    specText: {
      fontSize: 12,
      color: themeColors.text,
      marginLeft: 4,
      fontWeight: '600',
    },

    // Metrics Section - Enhanced
    vehicleMetrics: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: themeColors.border,
    },
    ratingSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginLeft: 4,
    },
    reviewsText: {
      fontSize: 14,
      color: themeColors.textSecondary,
      marginLeft: 4,
    },
    locationSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      fontSize: 14,
      color: themeColors.textSecondary,
      marginLeft: 4,
      fontWeight: '500',
    },

    // Action Buttons - Redesigned
    vehicleActions: {
      flexDirection: 'row',
      gap: 12,
    },
    detailsButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: themeColors.white,
    },
    detailsButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.white,
      marginLeft: 6,
    },
    rentButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.primary,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      shadowColor: themeColors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    rentButtonDisabled: {
      backgroundColor: themeColors.textSecondary,
      shadowOpacity: 0,
    },
    rentButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.white,
      marginLeft: 6,
    },

    // Empty State - Enhanced
    emptyState: {
      alignItems: 'center',
      paddingVertical: 60,
      paddingHorizontal: 40,
    },
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
      borderWidth: 2,
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    emptyMessage: {
      fontSize: 16,
      color: themeColors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 24,
    },
    clearFiltersButton: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 24,
    },
    clearFiltersText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.white,
    },

    // Loading State - Enhanced
    loadingContainer: {
      alignItems: 'center',
      paddingVertical: 60,
    },
    loadingCard: {
      backgroundColor: themeColors.cardBackground,
      paddingHorizontal: 32,
      paddingVertical: 24,
      borderRadius: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.border,
      shadowColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 4,
    },
    loadingText: {
      fontSize: 18,
      color: themeColors.text,
      marginTop: 16,
      fontWeight: '600',
    },


  });
};

export default createStyles;