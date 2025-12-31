import { StatusBar, StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getSummaryStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: StatusBar.currentHeight || 0,
    },
    sectionContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
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
    buttonText: { fontFamily: 'DMSansBold', fontSize: 16, color: colors.white },
    titleContainer: { justifyContent: 'center', alignItems: 'center' },
    title: {
      fontFamily: 'DMSansBold',
      textAlign: 'center',
      fontSize: 28,
      color: theme.text,
    },
    difficultyImageContainer: {
      flexDirection: 'row',
    },
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
    gameResultContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
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
    progressionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    historySectionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
  });
};
