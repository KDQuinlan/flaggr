import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getFeedbackStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      width: '100%',
      paddingHorizontal: 20,
    },
    textBox: {
      marginTop: 20,
      height: 150,
      borderWidth: 1,
      borderColor: theme.accent,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme.card,
      color: theme.text,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 40,
      color: '#0073E6',
    },
    section: {
      marginTop: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontFamily: 'DMSansBold',
      color: theme.text,
    },
    optional: {
      fontWeight: '400',
      fontSize: 14,
      color: '#666',
    },
    dropdown: {
      height: 50,
      borderColor: theme.accent,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: theme.card,
    },
    buttonEnabled: {
      backgroundColor: theme.button,
      paddingVertical: 10,
      marginTop: 20,
      borderRadius: 8,
      width: '100%',
      maxWidth: 240,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: colors.bluePrimary,
      elevation: 4,
    },
    buttonDisabled: {
      backgroundColor: theme.button,
      paddingVertical: 10,
      marginTop: 20,
      borderRadius: 8,
      width: '100%',
      maxWidth: 240,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 16,
      color: theme.buttonText,
      fontFamily: 'DMSansBold',
    },
  });
};
