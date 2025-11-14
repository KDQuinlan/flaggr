import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getCustomSummaryStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    summaryContainer: {
      paddingHorizontal: 12,
    },
    sectionContainer: {
      backgroundColor: theme.card,
      borderRadius: 10,
      shadowColor: theme.shadow,
      // elevation: 4,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      paddingVertical: 10,
    },
    buttonContainer: {
      backgroundColor: theme.background,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    animationContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: colors.bluePrimary,
      paddingVertical: 10,
      borderRadius: 5,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    title: {
      fontFamily: 'DMSansBold',
      textAlign: 'center',
      fontSize: 28,
      paddingBottom: 10,
      color: theme.text,
    },
    unlockText: { fontFamily: 'DMSans', color: theme.text },
    buttonText: { fontFamily: 'DMSansBold', fontSize: 20, color: theme.text },
  });
};
