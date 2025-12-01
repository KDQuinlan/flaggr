import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getSettingsStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingVertical: 20,
      gap: 20,
    },
    sectionRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    label: {
      fontSize: 16,
      fontFamily: 'DMSansBold',
      color: theme.text,
    },
    text: {
      fontSize: 14,
      fontFamily: 'DMSans',
      color: theme.text,
    },
    dropdown: {
      height: 50,
      borderColor: theme.accent,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: theme.card,
      marginTop: 10,
    },
    button: {
      backgroundColor: theme.button,
      paddingVertical: 10,
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
    privacyPolicyText: {
      fontFamily: 'DMSans',
      textDecorationLine: 'underline',
      color: theme.linkText,
    },
    resetProgressContainer: {
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 8,
      gap: 20,
    },
    resetProgressTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
};
