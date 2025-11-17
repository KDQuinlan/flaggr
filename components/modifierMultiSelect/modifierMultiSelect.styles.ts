import { PixelRatio, StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '../colors';

const fontScale = PixelRatio.getFontScale();
const dynamicButtonHeight = Math.min(50 * fontScale, 80);

export const getModifierMultiSelectStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
    },
    button: {
      flexBasis: '48%',
      height: dynamicButtonHeight,
      backgroundColor: theme.background,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      shadowColor: theme.shadow,
      elevation: 4,
    },
    buttonText: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 16,
    },
    buttonSelected: {
      backgroundColor: theme.button,
      shadowOpacity: 0,
      elevation: 0,
    },
    buttonTextSelected: {
      fontFamily: 'DMSans',
      color: colors.white,
      fontSize: 16,
    },
  });
};
