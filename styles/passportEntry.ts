import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

export const getPassportEntryStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 20,
      gap: 20,
    },
    title: { fontSize: 16, fontFamily: 'DMSansBold', color: theme.text },
    text: { fontSize: 14, fontFamily: 'DMSans', color: theme.text },
    icon: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    flagTitleContainer: {
      alignItems: 'center',
      maxWidth: SCREEN_MAX_WIDTH,
      alignSelf: 'center',
    },
  });
};
