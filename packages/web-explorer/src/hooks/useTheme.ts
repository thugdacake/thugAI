import { useMemo } from 'react';
import { Theme } from '../types';

const lightTheme: Theme = {
  background: '#ffffff',
  text: '#1a1a1a',
  primary: '#3182ce',
  secondary: '#e2e8f0'
};

const darkTheme: Theme = {
  background: '#1a1a1a',
  text: '#ffffff',
  primary: '#4299e1',
  secondary: '#2d3748'
};

export const useTheme = (theme: 'light' | 'dark' = 'light') => {
  const currentTheme = useMemo(() => {
    return theme === 'light' ? lightTheme : darkTheme;
  }, [theme]);

  return { currentTheme };
};
