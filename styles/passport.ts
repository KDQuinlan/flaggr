import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getPassportStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
      marginHorizontal: 20,
      marginTop: 20,
      gap: 20,
    },
    emptyPassportTitleText: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 20,
    },
    emptyPassportText: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 14,
      marginTop: 20,
    },
    searchInput: {
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.accent,
    },
  });
};
