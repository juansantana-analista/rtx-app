import React, { createContext, useState, useContext } from 'react';
import { colors } from './colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Alterado para tema escuro como padrão
  const [theme, setTheme] = useState('dark');
  const themeColors = colors[theme];

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
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