import { StatusBar, StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getProfileStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: StatusBar.currentHeight || 0,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 20,
      gap: 20,
      marginHorizontal: 20,
    },
    genericContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    usernameText: {
      fontFamily: 'DMSansBold',
      color: theme.text,
      fontSize: 20,
    },
    icon: {
      height: 72,
      width: 72,
      borderRadius: 36,
      borderWidth: 1,
      borderColor: theme.accent,
    },
    levelText: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 16,
    },
    subtitleText: {
      fontFamily: 'DMSansBold',
      color: theme.text,
      fontSize: 18,
    },
    statsHeaderText: {
      fontFamily: 'DMSansBold',
      color: theme.text,
      fontSize: 16,
    },
    statsSubHeaderText: {
      color: theme.text,
      fontFamily: 'DMSansBold',
      fontSize: 15,
      textAlign: 'center',
    },
    statsText: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 14,
      textAlign: 'center',
    },
    progressBarContainer: {
      height: 20,
      width: 200,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.accent,
    },
    progressBar: {
      height: '100%',
      backgroundColor: colors.bluePrimary,
      borderRadius: 100,
    },
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: theme.accent,
    },
    statsContainer: {
      gap: 20,
      width: '100%',
    },
    statsCategoryContainer: {
      backgroundColor: theme.backgroundHighContrast,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      borderColor: theme.accent,
      borderWidth: 1,
      gap: 10,
    },
    statsDataContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      width: '100%',
    },
    statsDataContainerCompact: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    statsInfoIconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statsImage: {
      flex: 1,
      aspectRatio: 16 / 9,
    },
    statsImageCompact: {
      width: '50%',
      aspectRatio: 16 / 9,
      marginTop: 10,
    },
  });
};
