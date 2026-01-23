import { StyleSheet } from 'react-native';

export const getSummaryStyles = () => {
  return StyleSheet.create({
    titleContainer: { justifyContent: 'center', alignItems: 'center' },
    difficultyImageContainer: {
      flexDirection: 'row',
    },
    gameResultContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    progressionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  });
};
