import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

const { width } = Dimensions.get('window');

const createStyles = () => {
  const { theme, themeColors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    categoriesContainer: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border || themeColors.mediumGray,
    },
    categoriesScroll: {
      paddingHorizontal: 20,
    },
    categoryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.cardBackground,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 12,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    categoryButtonActive: {
      backgroundColor: themeColors.secondary,
      borderColor: themeColors.secondary,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text,
      marginLeft: 6,
    },
    categoryTextActive: {
      color: themeColors.white,
    },
    newsContainer: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    newsCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      marginBottom: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
      overflow: 'hidden',
    },
    featuredNewsCard: {
      borderColor: themeColors.secondary,
      borderWidth: 2,
    },
    newsImageContainer: {
      position: 'relative',
      height: 160,
      backgroundColor: themeColors.lightGray || '#F5F5F5',
    },
    newsImagePlaceholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.lightGray || '#F5F5F5',
    },
    featuredBadge: {
      position: 'absolute',
      top: 12,
      left: 12,
      backgroundColor: themeColors.secondary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    featuredBadgeText: {
      color: themeColors.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    newsContent: {
      padding: 20,
    },
    newsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    newsCategory: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.secondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    newsTime: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
    },
    newsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      lineHeight: 24,
      marginBottom: 8,
      letterSpacing: -0.2,
    },
    newsSummary: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      lineHeight: 20,
      marginBottom: 16,
    },
    newsFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    newsReadTime: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.darkGray,
      fontWeight: '500',
    },
  });
};

export default createStyles; 