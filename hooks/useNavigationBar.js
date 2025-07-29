// hooks/useNavigationBar.js
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export const useNavigationBar = (theme, themeColors) => {
  useEffect(() => {
    const configureNavigationBar = async () => {
      // Apenas no Android (iOS não tem navigation bar)
      if (Platform.OS === 'android') {
        try {
          // Define a cor de fundo da navigation bar baseada no tema
          const backgroundColor = theme === 'dark' 
            ? themeColors.background || '#0F1419'  // Cor escura
            : themeColors.white || '#FFFFFF';      // Cor clara

          await NavigationBar.setBackgroundColorAsync(backgroundColor);

          // Define o estilo dos botões (light ou dark)
          const buttonStyle = theme === 'dark' 
            ? 'light'  // Botões claros em fundo escuro
            : 'dark';  // Botões escuros em fundo claro

          await NavigationBar.setButtonStyleAsync(buttonStyle);

        } catch (error) {
          console.error('Erro ao configurar Navigation Bar:', error);
        }
      }
    };

    configureNavigationBar();
  }, [theme, themeColors]);

  // Função para esconder/mostrar a navigation bar se necessário
  const hideNavigationBar = async () => {
    if (Platform.OS === 'android') {
      try {
        await NavigationBar.setVisibilityAsync('hidden');
      } catch (error) {
        console.error('Erro ao esconder Navigation Bar:', error);
      }
    }
  };

  const showNavigationBar = async () => {
    if (Platform.OS === 'android') {
      try {
        await NavigationBar.setVisibilityAsync('visible');
      } catch (error) {
        console.error('Erro ao mostrar Navigation Bar:', error);
      }
    }
  };

  return {
    hideNavigationBar,
    showNavigationBar
  };
};