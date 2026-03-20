import { StyleSheet, StatusBar } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

export const getSetupStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: StatusBar.currentHeight || 0,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      gap: 20,
      width: '100%',
      maxWidth: SCREEN_MAX_WIDTH,
      alignSelf: 'center',
      paddingHorizontal: 20,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      width: '100%',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 40,
      color: theme.headerText,
      fontFamily: 'Chewy',
    },
    section: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 20,
    },
    buttonEnabled: {
      backgroundColor: colors.bluePrimary,
      paddingVertical: 10,
      borderRadius: 8,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: colors.bluePrimary,
      elevation: 2,
    },
    buttonDisabled: {
      backgroundColor: colors.bluePrimary,
      paddingVertical: 10,
      borderRadius: 8,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontFamily: 'DMSansBold',
      color: theme.buttonText,
    },
    header: {
      fontSize: 16,
      fontFamily: 'DMSansBold',
      color: theme.text,
    },
    inappropriateText: {
      fontSize: 16,
      fontFamily: 'DMSans',
      color: colors.incorrectRed,
    },
    textBox: {
      borderWidth: 1,
      borderColor: theme.accent,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      backgroundColor: theme.card,
      color: theme.text,
    },
  });
};
