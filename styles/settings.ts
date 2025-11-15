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
    },
    dropdownSection: {
      marginTop: 20,
    },
    section: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 20,
    },
    label: {
      fontSize: 16,
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
      marginTop: 10,
    },
    button: {
      backgroundColor: theme.button,
      paddingVertical: 10,
      marginTop: 20,
      borderRadius: 8,
      width: '100%',
      maxWidth: 240,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: theme.shadow,
      // elevation: 4,
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
  });
};
