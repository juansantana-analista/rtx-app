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
      padding: 20,
      borderRadius: 12,
      shadowColor: themeColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
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
    },
    balanceActions: {
      flexDirection: 'row',
      gap: 12,
    },
    accessWallet: {
      alignSelf: 'flex-start',
    },
    accessWalletText: {
      color: themeColors.secondary,
      fontSize: 16,
      fontWeight: '500',
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
      width: 50,
      height: 50,
      borderRadius: 12,
      backgroundColor: themeColors.lightGray,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: themeColors.secondary,
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    badgeText: {
      color: themeColors.white,
      fontSize: 10,
      fontWeight: 'bold',
    },
    menuTitle: {
      fontSize: 12,
      color: themeColors.text,
      textAlign: 'center',
      lineHeight: 16,
    },
    promoSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    participationCard: {
      backgroundColor: themeColors.primary,
      borderRadius: 12,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    participationContent: {
      flex: 1,
    },
    participationTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.white,
    },
    participationPeriod: {
      fontSize: 14,
      color: themeColors.white,
      opacity: 0.8,
      marginTop: 4,
      marginBottom: 12,
    },
    participationButton: {
      backgroundColor: themeColors.secondary,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      alignSelf: 'flex-start',
    },
    participationButtonText: {
      color: themeColors.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    participationIcon: {
      width: 60,
      height: 40,
      backgroundColor: themeColors.white,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarIcon: {
      fontSize: 24,
    },
    piggyCard: {
      backgroundColor: themeColors.lightGray,
      borderRadius: 12,
      padding: 20,
      position: 'relative',
      minHeight: 120,
    },
    piggyBadge: {
      position: 'absolute',
      top: 12,
      left: 12,
      backgroundColor: '#4A90E2',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    piggyBadgeText: {
      color: themeColors.white,
      fontSize: 10,
      fontWeight: 'bold',
    },
    piggyContent: {
      marginTop: 20,
      marginRight: 80,
    },
    piggyText: {
      fontSize: 16,
      color: '#8B4513',
    },
    piggyHighlight: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#8B4513',
    },
    saveButton: {
      backgroundColor: themeColors.secondary,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      alignSelf: 'flex-start',
      marginTop: 12,
    },
    saveButtonText: {
      color: themeColors.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    piggyIcons: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      alignItems: 'center',
    },
    pigEmoji: {
      fontSize: 40,
    },
    lifeRing: {
      position: 'absolute',
      top: -10,
      right: -10,
    },
    lifeRingEmoji: {
      fontSize: 20,
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
    },
    investmentCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: themeColors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    investmentInfo: {
      flex: 1,
    },
    investmentTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
    },
    investmentSubtitle: {
      fontSize: 14,
      color: themeColors.darkGray,
      marginBottom: 4,
    },
    investmentYield: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors.secondary,
    },
    yieldIndicator: {
      height: 3,
      backgroundColor: themeColors.secondary,
      width: 50,
      marginTop: 8,
      borderRadius: 2,
    },
    bottomNavSafeArea: {
      backgroundColor: themeColors.cardBackground,
    },
    bottomNav: {
      flexDirection: 'row',
      backgroundColor: themeColors.cardBackground,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: themeColors.mediumGray,
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
      color: themeColors.darkGray,
      marginTop: 4,
    },
    activeNavText: {
      color: themeColors.secondary,
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