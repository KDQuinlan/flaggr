import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

export const getStatsStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    statsContainer: {
      backgroundColor: theme.backgroundHighContrast,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 20,
      padding: 16,
      borderRadius: 8,
      borderColor: theme.accent,
      borderWidth: 1,
      gap: 10,
      maxWidth: SCREEN_MAX_WIDTH,
    },
    statsSubHeaderText: {
      color: theme.text,
      fontFamily: 'DMSansBold',
      fontSize: 15,
      textAlign: 'center',
    },
    statsText: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 14,
      textAlign: 'center',
    },
    statsImage: {
      flex: 1,
      aspectRatio: 16 / 9,
    },
  });
};
