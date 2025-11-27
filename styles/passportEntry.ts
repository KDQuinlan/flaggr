import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getPassportEntryStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 20,
      marginHorizontal: 20,
      marginTop: 20,
      gap: 20,
    },
  });
};
