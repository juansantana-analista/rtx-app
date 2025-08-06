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
    },
    imageCarousel: {
      height: 300,
      position: 'relative',
    },
    carouselImage: {
      width: width,
      height: 300,
      resizeMode: 'cover',
    },
    carouselPagination: {
      position: 'absolute',
      bottom: 16,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.5)',
      marginHorizontal: 4,
    },
    paginationDotActive: {
      backgroundColor: themeColors.white,
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    backButton: {
      position: 'absolute',
      top: 16,
      left: 16,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 20,
      padding: 8,
      zIndex: 10,
    },
    favoriteButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 20,
      padding: 8,
      zIndex: 10,
    },
    vehicleInfo: {
      padding: 20,
    },
    vehicleHeader: {
      marginBottom: 16,
    },
    vehicleTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
    },
    vehicleSubtitle: {
      fontSize: 16,
      color: themeColors.textSecondary,
      marginBottom: 8,
    },
    vehiclePrice: {
      fontSize: 28,
      fontWeight: 'bold',
      color: themeColors.secondary,
      marginBottom: 16,
    },
    badgeContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    badge: {
      backgroundColor: themeColors.success,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    rating: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginRight: 8,
    },
    reviews: {
      fontSize: 14,
      color: themeColors.textSecondary,
    },
    specsSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
    },
    specsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -8,
    },
    specItem: {
      width: '50%',
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    specCard: {
      backgroundColor: themeColors.cardBackground,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    specIcon: {
      marginBottom: 8,
    },
    specLabel: {
      fontSize: 12,
      color: themeColors.textSecondary,
      marginBottom: 4,
    },
    specValue: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
    },
    featuresSection: {
      marginBottom: 24,
    },
    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
      marginBottom: 12,
    },
    featureIcon: {
      marginRight: 8,
    },
    featureText: {
      fontSize: 14,
      color: themeColors.text,
    },
    locationSection: {
      marginBottom: 24,
    },
    locationCard: {
      backgroundColor: themeColors.cardBackground,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIcon: {
      marginRight: 12,
    },
    locationInfo: {
      flex: 1,
    },
    locationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 4,
    },
    locationAddress: {
      fontSize: 14,
      color: themeColors.textSecondary,
    },
    descriptionSection: {
      marginBottom: 24,
    },
    descriptionText: {
      fontSize: 16,
      color: themeColors.text,
      lineHeight: 24,
    },
    actionsSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    primaryButton: {
      flex: 1,
      backgroundColor: themeColors.success,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
    },
    primaryButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: themeColors.white,
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: themeColors.text,
    },
    secondaryButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: themeColors.text,
    },
    contactButton: {
      backgroundColor: themeColors.success,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 12,
    },
    contactButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.white,
    },
  });
};

export default createStyles; 