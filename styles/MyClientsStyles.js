import { StyleSheet } from 'react-native';

const createStyles = (themeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.background,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    summaryCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginTop: 20,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    summaryItem: {
      flex: 1,
      alignItems: 'center',
    },
    summaryLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: themeColors.textSecondary,
      marginBottom: 4,
      textAlign: 'center',
    },
         summaryValue: {
       fontSize: 16,
       fontWeight: 'bold',
       color: themeColors.text,
       textAlign: 'center',
       numberOfLines: 1,
     },
    clientsSection: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 16,
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: themeColors.error + '20',
      borderRadius: 12,
      marginBottom: 16,
    },
    errorText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.error,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 8,
      color: themeColors.textSecondary,
    },
    emptySubtext: {
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
      color: themeColors.textSecondary,
    },
    clientCard: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    clientHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    clientInfo: {
      flex: 1,
      marginRight: 16,
    },
    clientName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
    },
    clientCpf: {
      fontSize: 14,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },
    clientStatus: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    clientDetails: {
      marginBottom: 16,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    detailText: {
      fontSize: 14,
      color: themeColors.textSecondary,
      marginLeft: 8,
      flex: 1,
    },
         clientFinancial: {
       marginBottom: 16,
       paddingTop: 16,
       borderTopWidth: 1,
       borderTopColor: themeColors.border,
     },
     financialItem: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginBottom: 8,
     },
     financialLabel: {
       fontSize: 12,
       fontWeight: '500',
       color: themeColors.textSecondary,
       flex: 1,
     },
     financialValue: {
       fontSize: 14,
       fontWeight: 'bold',
       color: themeColors.text,
       textAlign: 'right',
       flex: 1,
     },
    clientFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: themeColors.border,
    },
         lastActivity: {
       fontSize: 12,
       color: themeColors.textSecondary,
       fontWeight: '500',
     },
     skeletonLine: {
       borderRadius: 4,
     },
     
   });
 };

export default createStyles; 