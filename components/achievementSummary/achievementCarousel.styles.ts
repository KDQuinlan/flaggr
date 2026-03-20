import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getAchievementCarouselStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    achievementText: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 14,
      textAlign: 'center',
    },
    achievementHeaderText: {
      fontFamily: 'DMSansBold',
      color: theme.text,
      fontSize: 16,
      textAlign: 'center',
    },
    carouselCard: {
      padding: 20,
      borderRadius: 8,
      backgroundColor: theme.backgroundHighContrast,
      shadowColor: theme.shadow,
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 3,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.accent,
    },
    icon: {
      height: 80,
      width: 80,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: -20,
    },
  });
};
