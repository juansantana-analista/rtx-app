import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

const FloatingLoader = ({ message = 'Carregando...' }) => {
  const { themeColors } = useTheme();

  const styles = {
    floatingLoader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    floatingLoaderContent: {
      backgroundColor: themeColors.cardBackground,
      paddingHorizontal: 24,
      paddingVertical: 20,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
      minWidth: 120,
    },
    floatingLoaderText: {
      marginLeft: 12,
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
    },
  };

  return (
    <View style={styles.floatingLoader}>
      <View style={styles.floatingLoaderContent}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text style={styles.floatingLoaderText}>{message}</Text>
      </View>
    </View>
  );
};

export default FloatingLoader; 