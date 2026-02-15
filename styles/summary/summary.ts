import { StyleSheet } from 'react-native';

export const getSummaryStyles = () => {
  return StyleSheet.create({
    titleContainer: { justifyContent: 'center', alignItems: 'center' },
    difficultyImageContainer: {
      flexDirection: 'row',
    },
    progressionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  });
};
