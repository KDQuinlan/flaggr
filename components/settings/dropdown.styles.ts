import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getDropdownStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    label: {
      fontFamily: 'DMSansBold',
      fontSize: 16,
      color: theme.text,
    },
    labelSubtext: {
      fontFamily: 'DMSans',
      fontSize: 14,
      color: theme.helperText,
    },
    dropdown: {
      height: 50,
      borderColor: theme.accent,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: theme.card,
      marginTop: 10,
    },
    helperText: {
      fontFamily: 'DMSans',
      fontSize: 12,
      color: theme.helperText,
    },
  });
};
