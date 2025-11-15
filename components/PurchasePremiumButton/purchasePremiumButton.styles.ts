import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '../colors';

export const getPurchasePremiumButtonStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    button: {
      backgroundColor: colors.legendaryOrange,
      padding: 10,
      width: '100%',
      maxWidth: 240,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: theme.shadow,
      // elevation: 4,
    },
    buttonText: {
      fontSize: 16,
      color: colors.white,
      fontFamily: 'DMSansBold',
    },
  });
};
