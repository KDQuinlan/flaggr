import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getDifficultyStyles = (theme: ThemeColors) => {
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
      gap: 20,
      marginTop: 20,
      marginHorizontal: 20,
      marginBottom: 20,
    },
    practiceContainer: {
      alignSelf: 'center',
      backgroundColor: theme.card,
      padding: 10,
      flex: 1,
      width: '100%',
      maxWidth: 600,
      borderRadius: 8,
      shadowColor: theme.shadow,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: -10,
    },
    practiceText: {
      fontFamily: 'DMSansBold',
      fontSize: 16,
      color: theme.text,
      textAlign: 'center',
    },
  });
};
