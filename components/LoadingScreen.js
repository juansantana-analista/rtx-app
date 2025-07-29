import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

const LoadingScreen = ({ message = 'Carregando...' }) => {
  const { themeColors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.background,
    },
    content: {
      alignItems: 'center',
    },
    logo: {
      fontSize: 48,
      fontWeight: 'bold',
      color: themeColors.primary,
      marginBottom: 40,
    },
    message: {
      fontSize: 16,
      color: themeColors.text,
      marginTop: 20,
      textAlign: 'center',
    },
    spinner: {
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>RTX</Text>
        <ActivityIndicator 
          size="large" 
          color={themeColors.primary}
          style={styles.spinner}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

export default LoadingScreen; 