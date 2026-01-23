import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getSummarySharedStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 20,
    },
    sectionContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      gap: 20,
    },
    buttonContainer: {
      backgroundColor: theme.background,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.button,
      paddingVertical: 10,
      borderRadius: 8,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 200,
    },
    title: {
      fontFamily: 'DMSansBold',
      textAlign: 'center',
      fontSize: 28,
      color: theme.text,
    },
    buttonText: { fontFamily: 'DMSansBold', fontSize: 16, color: colors.white },
    subtitleText: { fontFamily: 'DMSans', color: theme.text, fontSize: 18 },
    valueText: { fontFamily: 'DMSansBold', color: theme.text, fontSize: 20 },
    scoreTitleText: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 20,
    },
    scoreValueText: {
      fontFamily: 'DMSansBold',
      color: theme.text,
      fontSize: 22,
    },
    gameResultScoreContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: -20,
    },
    gameResultAdvancedContainer: {
      width: '100%',
      flexDirection: 'row',
      maxWidth: 400,
    },
    gameResultAdvancedItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
