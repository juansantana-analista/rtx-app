import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';

const { width, height } = Dimensions.get('window');

const StatusScreen = ({ 
  type = 'success', // success, error, warning, info
  title,
  message,
  icon,
  primaryButton,
  secondaryButton,
  onPrimaryPress,
  onSecondaryPress,
  onClose,
  showCloseButton = true,
}) => {
  const { themeColors } = useTheme();

  const getStatusConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: icon || 'checkmark-circle',
          iconColor: themeColors.success,
          backgroundColor: themeColors.success + '15',
          borderColor: themeColors.success,
        };
      case 'error':
        return {
          icon: icon || 'close-circle',
          iconColor: themeColors.error,
          backgroundColor: themeColors.error + '15',
          borderColor: themeColors.error,
        };
      case 'warning':
        return {
          icon: icon || 'warning',
          iconColor: themeColors.warning,
          backgroundColor: themeColors.warning + '15',
          borderColor: themeColors.warning,
        };
      case 'info':
        return {
          icon: icon || 'information-circle',
          iconColor: themeColors.primary,
          backgroundColor: themeColors.primary + '15',
          borderColor: themeColors.primary,
        };
      default:
        return {
          icon: icon || 'checkmark-circle',
          iconColor: themeColors.success,
          backgroundColor: themeColors.success + '15',
          borderColor: themeColors.success,
        };
    }
  };

  const config = getStatusConfig();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: themeColors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    content: {
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
      width: width * 0.9,
      maxWidth: 400,
      shadowColor: themeColors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: config.backgroundColor,
      borderWidth: 2,
      borderColor: config.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    icon: {
      fontSize: 40,
      color: config.iconColor,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors.text,
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 28,
    },
    message: {
      fontSize: 16,
      color: themeColors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 24,
    },
    buttonContainer: {
      width: '100%',
      gap: 12,
    },
    primaryButton: {
      backgroundColor: themeColors.primary,
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      minHeight: 48,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    primaryButtonText: {
      color: themeColors.white,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      minHeight: 48,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    secondaryButtonText: {
      color: themeColors.text,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 8,
    },
    closeButton: {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showCloseButton && onClose && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color={themeColors.textSecondary} />
          </TouchableOpacity>
        )}

        <View style={styles.iconContainer}>
          <Ionicons name={config.icon} style={styles.icon} />
        </View>

        <Text style={styles.title}>{title}</Text>
        
        {message && (
          <Text style={styles.message}>{message}</Text>
        )}

        <View style={styles.buttonContainer}>
          {primaryButton && onPrimaryPress && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onPrimaryPress}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark" size={20} color={themeColors.white} />
              <Text style={styles.primaryButtonText}>{primaryButton}</Text>
            </TouchableOpacity>
          )}

          {secondaryButton && onSecondaryPress && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onSecondaryPress}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color={themeColors.text} />
              <Text style={styles.secondaryButtonText}>{secondaryButton}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default StatusScreen; 