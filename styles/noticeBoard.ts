import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

export const getNoticeBoardStyles = (theme: ThemeColors) => {
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
      padding: 20,
    },
    noticeBoardEntryContainer: {
      backgroundColor: theme.card,
      width: '100%',
      maxWidth: SCREEN_MAX_WIDTH,
      borderRadius: 8,
      shadowColor: theme.text,
      elevation: 2,
    },
    noticeBoardEntryImageContainer: {
      height: 100,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    noticeBoardEntryImage: {
      width: '100%',
      height: 100,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    noticeBoardEntryTextContainer: {
      minHeight: 50,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      justifyContent: 'space-between',
      paddingVertical: 10,
      gap: 5,
    },
    noticeBoardEntryTitleText: {
      color: theme.text,
      fontFamily: 'DMSansBold',
      fontSize: 18,
      alignSelf: 'center',
    },
    noticeBoardEntryText: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 14,
    },
    noticeBoardEntryPillContainer: {
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 1,
    },
    noticeBoardEntryPillText: {
      color: colors.white,
      fontFamily: 'DMSans',
      fontSize: 14,
    },
    noticeBoardEntrySubtextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
  });
};
