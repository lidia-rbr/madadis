import React, { useState, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../colors/colors';

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  </ThemeContext.Provider>
  )
}