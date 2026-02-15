import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

export const getSettingsStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      padding: 20,
      gap: 20,
      width: '100%',
      maxWidth: SCREEN_MAX_WIDTH,
      alignSelf: 'center',
    },
    sectionRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    label: {
      fontSize: 16,
      fontFamily: 'DMSansBold',
      color: theme.text,
    },
    text: {
      fontSize: 14,
      fontFamily: 'DMSans',
      color: theme.text,
    },
    button: {
      backgroundColor: theme.button,
      paddingVertical: 10,
      borderRadius: 8,
      width: '100%',
      maxWidth: 240,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
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
    resetProgressContainer: {
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 8,
      gap: 20,
    },
    resetProgressTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sliderTitle: {
      alignSelf: 'center',
      fontFamily: 'DMSansBold',
      fontSize: 14,
      color: theme.text,
    },
    sliderValuesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
  });
};
