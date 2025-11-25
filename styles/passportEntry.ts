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
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 20,
      overflow: 'visible',
    },
  });
};
