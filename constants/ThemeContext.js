import React, { createContext, useState, useContext, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { colors } from './colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const themeColors = colors[theme];

  // Função para configurar as barras do sistema sem warnings
  const configureSystemBars = (currentTheme, currentColors) => {
    if (Platform.OS === 'android') {
      try {
        // StatusBar sempre funciona
        const statusBarColor = currentColors.primary;
        StatusBar.setBackgroundColor(statusBarColor, true);
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setTranslucent(false);

        // Navigation Bar - verifica se está disponível
        try {
          const NavigationBar = require('expo-navigation-bar');
          
          const navigationBarColor = currentTheme === 'dark' 
            ? '#0F1419'  // Preto para tema escuro
            : '#FFFFFF'; // Branco para tema claro

          const buttonStyle = currentTheme === 'dark' ? 'light' : 'dark';

          // Configura sem gerar warnings
          NavigationBar.setBackgroundColorAsync(navigationBarColor)
            .then(() => {
              return NavigationBar.setButtonStyleAsync(buttonStyle);
            })
            .then(() => {
            })
            .catch((error) => {
              // Se der erro (como edge-to-edge), usa configuração estática
              console.log('Usando configuração estática da navigation bar');
            });
          
        } catch (requireError) {
          // expo-navigation-bar não disponível, usa apenas configuração estática
          console.log('Navigation bar configurada via app.json');
        }

      } catch (error) {
        console.error('Erro na configuração:', error);
      }
    } else if (Platform.OS === 'ios') {
      // iOS - apenas StatusBar
      const barStyle = currentTheme === 'dark' ? 'light-content' : 'dark-content';
      StatusBar.setBarStyle(barStyle, true);
    }
  };

  // Configura na inicialização
  useEffect(() => {
    setTimeout(() => {
      configureSystemBars(theme, themeColors);
    }, 100);
  }, []);

  // Configura quando tema muda
  useEffect(() => {
    configureSystemBars(theme, themeColors);
  }, [theme, themeColors]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Configura com o novo tema
    const newColors = colors[newTheme];
    setTimeout(() => {
      configureSystemBars(newTheme, newColors);
    }, 50);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};