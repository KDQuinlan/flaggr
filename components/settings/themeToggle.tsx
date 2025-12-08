import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native-paper';

import { useTheme } from '@/context/ThemeContext';
import stateStore from '@/state/store';
import { colors } from '../colors';
import { getThemeToggleStyles } from './themeToggle.styles';

interface IThemeToggleProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
}

const ThemeToggle = React.memo(
  ({ isDarkTheme, setIsDarkTheme }: IThemeToggleProps) => {
    const { t } = useTranslation('settings');
    const { theme } = useTheme();
    const styles = useMemo(() => getThemeToggleStyles(theme), [theme]);
    const userSettings = stateStore((s) => s.userSettings);

    return (
      <View style={styles.sectionRow}>
        <Text style={styles.label}>{t('darkTheme')}</Text>
        <Switch
          color={colors.blueSecondary}
          value={userSettings.isDarkTheme}
          onValueChange={() => setIsDarkTheme(!isDarkTheme)}
        />
      </View>
    );
  }
);

export default ThemeToggle;
