import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '../colors';

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
      paddingVertical: 30,
      paddingHorizontal: 24,
      borderRadius: 16,
      width: '100%',
      maxWidth: 340,
      alignItems: 'center',
      shadowColor: theme.shadow,
      // elevation: 6,
    },
    titleText: {
      marginBottom: 10,
      fontWeight: '700',
      fontSize: 18,
      color: colors.bluePrimary,
    },
    bodyText: {
      marginBottom: 10,
      textAlign: 'center',
      color: theme.text,
      fontSize: 15,
    },
    ctaButton: {
      backgroundColor: colors.bluePrimary,
      padding: 10,
      borderRadius: 8,
      marginBottom: 20,
      width: '100%',
      maxWidth: 240,
      alignItems: 'center',
      shadowColor: theme.shadow,
      // elevation: 4,
    },
    primaryButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
    closeButton: {
      backgroundColor: colors.bluePrimary,
      padding: 10,
      marginTop: 20,
      borderRadius: 8,
      width: '60%',
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: '500',
      fontSize: 15,
    },
  });
};
