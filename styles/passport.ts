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
    emptyPassportContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 20,
      marginHorizontal: 20,
      marginTop: 20,
      gap: 20,
    },
    emptyPassportTitleText: {
      color: theme.text,
      fontFamily: 'DMSansBold',
      fontSize: 20,
    },
    emptyPassportText: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 14,
    },
    searchInput: {
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.accent,
    },
    passportCard: {
      backgroundColor: theme.card,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.accent,
      borderRadius: 8,
    },
    passportCardImage: {
      width: '100%',
      alignSelf: 'center',
      aspectRatio: 16 / 9,
      marginBottom: 10,
    },
    passportCardText: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 14,
      alignSelf: 'center',
    },
  });
};
