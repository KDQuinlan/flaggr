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
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 20,
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
    floatingButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    floatingButton: {
      marginBottom: 20,
      marginHorizontal: 20,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.accent,
      width: 70,
      height: 70,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    floatingIcon: { width: 50, height: 50 },
    anchorContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
};
