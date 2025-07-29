import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { createHeaderStyles } from '../styles/HeaderStyles';

const CustomHeader = ({ 
  title, 
  leftIcon, 
  leftAction, 
  rightActions = [], 
  showLogo = false,
  logoHeight = 120,
  showCenteredLogo = false
}) => {
  const { themeColors } = useTheme();
  const headerStyles = createHeaderStyles(themeColors);

  if (showLogo) {
    return (
      <>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={themeColors.primary} 
          translucent={false} 
        />
        <SafeAreaView style={[headerStyles.headerContainer, { paddingBottom: 20 }]}>
          <View style={[headerStyles.headerContent, { 
            height: logoHeight, 
            paddingTop: Platform.OS === 'ios' ? 10 : 15, // Reduzido o padding
            justifyContent: 'center' 
          }]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image 
                source={require('../assets/logortx.png')} 
                style={{ width: 280, height: 70 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={themeColors.primary} 
        translucent={false} 
      />
      <SafeAreaView style={headerStyles.headerContainer}>
        <View style={[headerStyles.headerContent, {
          paddingTop: Platform.OS === 'ios' ? 0 : 5 // Padding mínimo
        }]}>
          <View style={headerStyles.headerLeft}>
            {leftIcon && leftAction && (
              <TouchableOpacity 
                style={headerStyles.headerButton} 
                onPress={leftAction}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={leftIcon} 
                  size={20} 
                  style={headerStyles.headerIcon} 
                />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={headerStyles.headerCenter}>
            {showCenteredLogo ? (
              <Image 
                source={require('../assets/rtx-x-color.png')} 
                style={{ width: 140, height: 35 }}
                resizeMode="contain"
              />
            ) : (
              <Text style={headerStyles.headerTitle}>{title}</Text>
            )}
          </View>
          
          <View style={headerStyles.headerRight}>
            {rightActions.map((action, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  headerStyles.headerActionButton,
                  (action.icon === 'sunny-outline' || action.icon === 'moon-outline') && {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }
                ]}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={action.icon} 
                  size={18} 
                  style={[
                    headerStyles.headerIcon,
                    (action.icon === 'sunny-outline' || action.icon === 'moon-outline') && {
                      color: '#FFD700'
                    }
                  ]} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CustomHeader;