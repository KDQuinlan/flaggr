import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

export const getGameSelectStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    gameModeContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 20,
      paddingHorizontal: 15,
      shadowColor: theme.shadow,
      maxWidth: SCREEN_MAX_WIDTH,
    },
    gameIcon: {
      marginRight: 15,
    },
    textContainer: {
      flex: 1,
      flexShrink: 1,
      paddingRight: 20,
    },
    gameDetailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: 'DMSansBold',
      fontSize: 24,
      color: theme.text,
      flexWrap: 'wrap',
    },
    description: {
      fontFamily: 'DMSans',
      color: theme.descriptionText,
      marginTop: 4,
      flexWrap: 'wrap',
    },
  });
};
