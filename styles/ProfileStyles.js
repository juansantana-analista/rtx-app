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
      backgroundColor: themeColors.background,
    },
    profileCard: {
      backgroundColor: themeColors.cardBackground,
      margin: 20,
      padding: 24,
      borderRadius: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    profileAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    profileInitials: {
      fontSize: 32,
      fontWeight: 'bold',
      color: themeColors.white,
      letterSpacing: -0.5,
    },
    profileDetails: {
      flex: 1,
    },
    profileName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
      letterSpacing: -0.3,
    },
    profileEmail: {
      fontSize: 16,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 2,
      fontWeight: '500',
    },
    profileId: {
      fontSize: 14,
      color: themeColors.textTertiary || themeColors.darkGray,
      fontWeight: '400',
    },
    editProfileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.lightGray,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    editProfileText: {
      fontSize: 16,
      color: themeColors.accent || themeColors.secondary,
      fontWeight: '600',
      marginLeft: 8,
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.cardBackground,
      padding: 16,
      borderRadius: 12,
      marginBottom: 8,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    optionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 4,
      letterSpacing: -0.1,
    },
    optionSubtitle: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      fontWeight: '400',
      lineHeight: 18,
    },
    appInfo: {
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 32,
      marginBottom: 20,
    },
    appVersion: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
      letterSpacing: -0.1,
    },
    appCopyright: {
      fontSize: 14,
      color: themeColors.textTertiary || themeColors.darkGray,
      fontWeight: '400',
    },
  });
};

export default createStyles;