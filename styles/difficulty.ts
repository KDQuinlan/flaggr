import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

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
      gap: 20,
      marginHorizontal: 20,
      paddingBottom: 20,
    },
    practiceContainer: {
      alignSelf: 'center',
      backgroundColor: theme.card,
      padding: 10,
      flex: 1,
      width: '100%',
      maxWidth: SCREEN_MAX_WIDTH,
      borderRadius: 8,
      shadowColor: theme.shadow,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    practiceText: {
      fontFamily: 'DMSansBold',
      fontSize: 16,
      color: theme.text,
      textAlign: 'center',
    },
  });
};
