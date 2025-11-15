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
      flex: 2,
    },
    answersContainer: {
      flex: 4,
      maxWidth: 500,
      alignSelf: 'center',
      width: '100%',
    },
    answerBox: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      borderRadius: 8,
      flexShrink: 1,
      minHeight: 50,
    },
    progressBar: {
      marginBottom: 25,
      borderRadius: 8,
      backgroundColor: colors.white,
      height: 5,
      alignSelf: 'center',
    },
    answerOrderText: {
      color: colors.bluePrimary,
      fontFamily: 'DMSansBold',
      fontSize: 20,
      paddingLeft: 20,
      paddingRight: 10,
    },
    answerText: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 20,
      flexShrink: 1,
    },
  });
};
