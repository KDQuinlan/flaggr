import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getLoadingStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    text: {
      fontFamily: 'DMSansBold',
      marginTop: 12,
      fontSize: 16,
      color: theme.text,
    },
  });
};
