import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

export const getNoticeBoardEntryStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 20,
    },
    scrollContainer: {
      flexGrow: 1,
      gap: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    image: {
      width: '100%',
      maxWidth: SCREEN_MAX_WIDTH,
      height: 100,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    titleText: {
      fontSize: 20,
      fontFamily: 'DMSansBold',
      color: theme.text,
    },
    headerText: {
      fontSize: 18,
      fontFamily: 'DMSansBold',
      color: colors.blueSecondary,
      textDecorationLine: 'underline',
    },
    text: { fontSize: 14, fontFamily: 'DMSans', color: theme.text },
  });
};
