import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getCustomStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'space-between',
    },
    scrollContainer: {
      paddingHorizontal: 12,
    },
    modifierContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      shadowColor: theme.shadow,
      // elevation: 4,
      marginTop: 20,
      paddingBottom: 5,
      width: '100%',
    },
    independentCountriesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 15,
      paddingRight: 15,
    },
    independentCountriesTextContainer: {
      flex: 1,
      flexShrink: 1,
      justifyContent: 'center',
    },
    independentCountriesText: {
      fontFamily: 'DMSans',
      color: colors.blueSecondary,
      paddingRight: 5,
      flexWrap: 'wrap',
    },
    independentCountriesMultiplierText: {
      fontFamily: 'DMSansBold',
      color: colors.blueSecondary,
      fontSize: 12,
    },
    sectionContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionIcon: {
      height: 20,
      width: 20,
    },
    subHeader: {
      paddingVertical: 10,
      fontFamily: 'DMSansBold',
      fontSize: 18,
      color: colors.blueSecondary,
      paddingLeft: 10,
    },
    ruleContainer: {
      paddingLeft: 10,
      paddingBottom: 10,
    },
    ruleLabel: {
      fontFamily: 'DMSansBold',
      fontSize: 14,
      color: colors.blueSecondary,
      paddingLeft: 10,
      marginBottom: 5,
    },
    slider: {
      width: '100%',
      alignSelf: 'center',
    },
    sliderHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingRight: 15,
    },
    sliderQuantityContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    sliderQuantityText: {
      fontFamily: 'DMSansBold',
      textAlign: 'right',
      fontSize: 12,
      color: colors.blueSecondary,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    sliderLabels: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingLeft: 10,
      paddingRight: 15,
    },
    sliderLabelText: {
      fontFamily: 'DMSans',
      fontSize: 12,
      color: colors.blueSecondary,
    },
    helperText: {
      fontFamily: 'DMSans',
      color: colors.blueSecondary,
      fontSize: 14,
      textAlign: 'center',
      justifyContent: 'center',
      paddingTop: 10,
    },
    buttonEnabled: {
      backgroundColor: colors.bluePrimary,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 8,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: colors.bluePrimary,
      elevation: 2,
    },
    buttonDisabled: {
      backgroundColor: colors.bluePrimary,
      opacity: 0.5,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 8,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      fontFamily: 'DMSansBold',
      fontSize: 16,
      color: colors.white,
    },
    divider: {
      height: 1,
      backgroundColor: theme.accent,
      marginVertical: 5,
    },
    resetButton: {
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    finalScoreMultiplierText: {
      fontFamily: 'DMSansBold',
      fontSize: 16,
      color: colors.blueSecondary,
      textAlign: 'center',
      paddingTop: 10,
    },
    accordionContainer: {
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 8,
      overflow: 'hidden',
      shadowColor: theme.shadow,
      // elevation: 2,
    },
  });
};
