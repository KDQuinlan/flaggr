import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getThemeToggleStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    sectionRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    label: {
      fontSize: 16,
      fontFamily: 'DMSansBold',
      color: theme.text,
    },
  });
};
