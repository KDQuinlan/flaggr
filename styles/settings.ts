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
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      width: '100%',
      paddingHorizontal: 20,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 40,
      color: theme.headerText,
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
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: theme.card,
    },
    button: {
      backgroundColor: theme.button,
      paddingVertical: 10,
      marginTop: 20,
      borderRadius: 5,
      width: '100%',
      maxWidth: 240,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
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
