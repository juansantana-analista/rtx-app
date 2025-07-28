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
    balanceCard: {
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
    balanceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    balanceAmount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: themeColors.text,
      letterSpacing: -0.5,
    },
    balanceActions: {
      flexDirection: 'row',
      gap: 16,
    },
    accessWallet: {
      alignSelf: 'flex-start',
    },
    accessWalletText: {
      color: themeColors.accent || themeColors.secondary,
      fontSize: 16,
      fontWeight: '600',
    },
    menuGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    menuItem: {
      width: (width - 60) / 4,
      alignItems: 'center',
      marginBottom: 20,
    },
    menuIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: themeColors.lightGray,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      position: 'relative',
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    badge: {
      position: 'absolute',
      top: -6,
      right: -6,
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderWidth: 2,
      borderColor: themeColors.background,
    },
    badgeText: {
      color: themeColors.white,
      fontSize: 10,
      fontWeight: 'bold',
    },
    menuTitle: {
      fontSize: 12,
      color: themeColors.textSecondary || themeColors.text,
      textAlign: 'center',
      lineHeight: 16,
      fontWeight: '500',
    },
    promoSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    participationCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    participationContent: {
      flex: 1,
    },
    participationTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.white,
      letterSpacing: -0.3,
    },
    participationPeriod: {
      fontSize: 14,
      color: themeColors.white,
      opacity: 0.85,
      marginTop: 4,
      marginBottom: 16,
    },
    participationButton: {
      backgroundColor: themeColors.accent || themeColors.secondary,
      borderRadius: 24,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignSelf: 'flex-start',
    },
    participationButtonText: {
      color: themeColors.white,
      fontSize: 13,
      fontWeight: 'bold',
    },
    participationIcon: {
      width: 64,
      height: 44,
      backgroundColor: themeColors.white,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarIcon: {
      fontSize: 24,
    },
    opportunitiesSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
      letterSpacing: -0.2,
    },
    investmentCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
      shadowColor: themeColors.shadow || themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: themeColors.border || themeColors.mediumGray,
    },
    investmentInfo: {
      flex: 1,
    },
    investmentTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 6,
      letterSpacing: -0.1,
    },
    investmentSubtitle: {
      fontSize: 14,
      color: themeColors.textSecondary || themeColors.darkGray,
      marginBottom: 8,
    },
    investmentYield: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.accent || themeColors.secondary,
    },
    yieldIndicator: {
      height: 3,
      backgroundColor: themeColors.accent || themeColors.secondary,
      width: 50,
      marginTop: 10,
      borderRadius: 2,
    },
    bottomNavSafeArea: {
      backgroundColor: themeColors.cardBackground,
    },
    bottomNav: {
      flexDirection: 'row',
      backgroundColor: themeColors.cardBackground,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: themeColors.border || themeColors.mediumGray,
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 8,
      position: 'relative',
    },
    activeNavItem: {
      // Estilo para item ativo
    },
    navText: {
      fontSize: 12,
      color: themeColors.textTertiary || themeColors.darkGray,
      marginTop: 4,
      fontWeight: '500',
    },
    activeNavText: {
      color: themeColors.accent || themeColors.secondary,
      fontWeight: 'bold',
    },
    notificationDot: {
      position: 'absolute',
      top: 4,
      right: '35%',
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: themeColors.error,
    },
  });
};

export default createStyles;