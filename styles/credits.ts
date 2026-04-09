import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getCreditsStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 20,
    },
    scrollContainer: {
      flexGrow: 1,
      gap: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    creatorText: {
      fontSize: 40,
      color: colors.bluePrimary,
      fontFamily: 'Chewy',
      alignSelf: 'center',
    },
    headerText: {
      color: colors.bluePrimary,
      fontFamily: 'DMSansBold',
      fontSize: 20,
    },
    text: {
      color: theme.text,
      fontFamily: 'DMSans',
    },
    navLink: {
      fontFamily: 'DMSans',
      textDecorationLine: 'underline',
      color: theme.linkText,
    },
    image: {
      height: 50,
      width: 75,
      alignSelf: 'center',
    },
  });
};
