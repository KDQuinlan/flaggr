import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '../colors';

export const getAnimatedXpProgressBarStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal: 20,
      maxWidth: 400,
      gap: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 10,
    },
    track: {
      flex: 1,
      height: 16,
      backgroundColor: theme.background,
      borderRadius: 8,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      backgroundColor: colors.bluePrimary,
      borderRadius: 8,
    },
    levelUpText: {
      fontSize: 20,
      fontFamily: 'DMSansBold',
      color: theme.text,
    },
    text: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 16,
    },
  });
};
