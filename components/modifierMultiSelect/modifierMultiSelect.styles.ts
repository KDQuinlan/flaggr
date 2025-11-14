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
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      // elevation: 4,
    },
    buttonText: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 16,
    },
    buttonSelected: {
      backgroundColor: colors.bluePrimary,
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
