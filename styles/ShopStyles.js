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
    welcomeBanner: {
      margin: 20,
      padding: 20,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme === 'dark' ? themeColors.cardBackground : themeColors.primary,
    },
    welcomeContent: {
      flex: 1,
    },
    welcomeTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.white,
      marginBottom: 4,
    },
    welcomeSubtitle: {
      fontSize: 14,
      color: themeColors.white,
      opacity: 0.8,
    },
    categoriesSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginHorizontal: 20,
      marginBottom: 16,
    },
    categoriesList: {
      paddingHorizontal: 20,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 25,
      marginRight: 12,
      borderWidth: 1,
      backgroundColor: themeColors.cardBackground,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
    },
    productsSection: {
      flex: 1,
    },
    productsList: {
      paddingHorizontal: 20,
    },
    productCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    productImageContainer: {
      position: 'relative',
    },
    productImage: {
      width: '100%',
      height: 200,
    },
    featuredBadge: {
      position: 'absolute',
      top: 12,
      left: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    featuredText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    discountBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    discountText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    productInfo: {
      padding: 16,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 8,
    },
    productDescription: {
      fontSize: 14,
      color: themeColors.textSecondary,
      marginBottom: 12,
      lineHeight: 20,
    },
    productStats: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    ratingText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text,
      marginLeft: 4,
    },
    statsText: {
      fontSize: 14,
      color: themeColors.textSecondary,
      marginRight: 16,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    currentPrice: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.secondary,
      marginRight: 12,
    },
    originalPrice: {
      fontSize: 16,
      color: themeColors.textSecondary,
      textDecorationLine: 'line-through',
    },
    buyButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    buyButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.white,
    },
  });
};

export default createStyles; 