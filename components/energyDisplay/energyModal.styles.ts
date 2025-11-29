import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getEnergyModalStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    modalContainer: {
      backgroundColor: theme.background,
      paddingVertical: 20,
      paddingHorizontal: 24,
      borderRadius: 8,
      width: '100%',
      maxWidth: 340,
      borderWidth: 1,
      borderColor: theme.accent,
      alignItems: 'center',
    },
    titleText: {
      marginBottom: 20,
      fontWeight: '700',
      fontSize: 20,
      color: theme.headerText,
    },
    bodyText: {
      marginBottom: 10,
      textAlign: 'center',
      color: theme.text,
      fontSize: 15,
    },
    ctaButton: {
      backgroundColor: theme.button,
      padding: 10,
      borderRadius: 8,
      marginBottom: 20,
      width: '100%',
      maxWidth: 240,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
    closeButton: {
      backgroundColor: theme.button,
      padding: 10,
      marginTop: 20,
      borderRadius: 8,
      width: '60%',
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontWeight: '500',
      fontSize: 16,
    },
  });
};
