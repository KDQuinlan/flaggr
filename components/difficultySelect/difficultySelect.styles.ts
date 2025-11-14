import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getDifficultySelectStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    gameModeContainer: {
      backgroundColor: theme.card,
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 20,
      paddingHorizontal: 15,
      shadowColor: theme.shadow,
      // elevation: 4,
      maxWidth: 600,
    },
    gameIcon: {
      marginRight: 15,
    },
    textContainer: {
      flex: 1,
      flexShrink: 1,
      paddingRight: 10,
    },
    gameDetailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: 'DMSansBold',
      fontSize: 24,
      color: theme.text,
      flexWrap: 'wrap',
    },
    description: {
      fontFamily: 'DMSans',
      color: theme.descriptionText,
      marginTop: 4,
      flexWrap: 'wrap',
    },
    progressBar: {
      marginTop: 5,
      height: 5,
      borderRadius: 10,
      width: '100%',
    },
    score: {
      justifyContent: 'center',
      alignSelf: 'flex-end',
      color: theme.text,
      fontWeight: 'bold',
      fontSize: 18,
    },
  });
};
