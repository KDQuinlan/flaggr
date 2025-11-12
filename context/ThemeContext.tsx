import { createContext, useContext, ReactNode } from 'react';

import { light, dark, ThemeColors } from '@/components/theme';
import stateStore from '@/state/store';

interface ThemeContextValue {
  theme: ThemeColors;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const userSettings = stateStore((s) => s.userSettings);
  const colors = userSettings.isDarkTheme ? dark : light;

  return (
    <ThemeContext.Provider value={{ theme: colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
