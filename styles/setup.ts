import { StyleSheet, StatusBar } from 'react-native';

import { ThemeColors } from '@/components/theme';

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
    title: {
      fontSize: 40,
      color: theme.headerText,
      fontFamily: 'Chewy',
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
      fontFamily: 'DMSansBold',
      fontSize: 16,
      color: theme.text,
    },
    optional: {
      fontFamily: 'DMSans',
      fontSize: 14,
      color: theme.helperText,
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
    helperText: {
      marginTop: 4,
      fontFamily: 'DMSans',
      fontSize: 12,
      color: theme.helperText,
    },
    button: {
      backgroundColor: theme.button,
      paddingVertical: 10,
      marginTop: 20,
      borderRadius: 5,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: theme.shadow,
      // elevation: 4,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: 'DMSansBold',
      color: theme.buttonText,
    },
  });
};
