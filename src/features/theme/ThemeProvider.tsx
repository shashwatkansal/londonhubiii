'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useHub } from '../hub/HubProvider';
import { HubTheme } from '../hub/types';

interface ThemeContextType {
  theme: HubTheme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultDarkMode?: boolean;
}

export function ThemeProvider({ children, defaultDarkMode = false }: ThemeProviderProps) {
  const { hub } = useHub();
  const [isDarkMode, setIsDarkMode] = React.useState(defaultDarkMode);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', hub.theme.primaryColor);
    root.style.setProperty('--secondary-color', hub.theme.secondaryColor);
    root.style.setProperty('--accent-color', hub.theme.accentColor);
    root.style.setProperty('--font-family', hub.theme.fontFamily);
  }, [hub.theme]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const value = {
    theme: hub.theme,
    isDarkMode,
    toggleDarkMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 