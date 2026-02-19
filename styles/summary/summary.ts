import { StyleSheet } from 'react-native';

export const getSummaryStyles = () => {
  return StyleSheet.create({
    titleContainer: { justifyContent: 'center', alignItems: 'center', gap: 20 },
    difficultyImageContainer: {
      flexDirection: 'row',
    },
    progressionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    icon: {
      height: 80,
      width: 80,
      marginVertical: -10,
    },
  });
};
