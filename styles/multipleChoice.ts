import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getMultipleChoiceStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    flagContainer: {
      flex: 4,
      paddingTop: 20,
    },
    answersContainer: {
      flex: 8,
      maxWidth: 500,
      alignSelf: 'center',
      width: '100%',
    },
    answerBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      borderRadius: 8,
      flexShrink: 1,
      minHeight: 50,
      paddingLeft: 20,
      paddingRight: 10,
    },
    progressBar: {
      borderRadius: 8,
      backgroundColor: colors.white,
      height: 5,
      alignSelf: 'center',
    },
    answerOrderText: {
      color: colors.bluePrimary,
      fontFamily: 'DMSansBold',
      fontSize: 20,
      paddingRight: 10,
    },
    answerText: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 20,
      flexShrink: 1,
    },
    adContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    statsRowContainer: {
      flex: 0.75,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      backgroundColor: theme.card,
    },
    statsRowStreakContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statsRowAlignmentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    statsText: {
      color: theme.text,
      fontFamily: 'DMSansBold',
      fontSize: 16,
    },
    statsIcon: { height: 20, width: 20 },
  });
};
