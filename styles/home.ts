import { StatusBar, StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getHomeStyles = (theme: ThemeColors) => {
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
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
      marginBottom: 10,
      maxWidth: 600,
    },
    titleContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
      pointerEvents: 'none',
    },
    title: {
      fontSize: 40,
      color: colors.bluePrimary,
      fontFamily: 'Chewy',
    },
    settingsIcon: {
      height: 25,
      width: 25,
    },
    floatingButton: {
      backgroundColor: theme.card,
      shadowColor: theme.shadow,
      width: 60,
      height: 60,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    floatingIcon: { width: '100%', height: '100%' },
    anchorContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    iconsContainer: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    socialMediaContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    socialMediaIcon: {
      width: 30,
      height: 30,
    },
    flagOfTheWeekContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      backgroundColor: theme.backgroundHighContrast,
      padding: 10,
      borderRadius: 8,
      borderColor: theme.accent,
      borderWidth: 1,
      elevation: 5,
      shadowColor: theme.shadow,
    },
    flagOfTheWeekTitle: {
      fontSize: 14,
      color: theme.text,
      fontFamily: 'DMSansBold',
    },
    flagOfTheWeekText: {
      fontSize: 12,
      color: theme.text,
      fontFamily: 'DMSans',
    },
    nonGameContainer: {
      flexDirection: 'row',
      gap: 20,
      marginVertical: -5,
      marginHorizontal: 20,
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: 600,
    },
    nonGameContainerSmallScreen: {
      flexDirection: 'row',
      marginVertical: -5,
      width: '100%',
    },
  });
};
