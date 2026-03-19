import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getAchievementDetailStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    flatlistStyle: {
      marginTop: 20,
      marginBottom: 20,
    },
    contentContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1,
      marginTop: 20,
      gap: 20,
    },
    progressContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    progressBarContainer: {
      width: 250,
      backgroundColor: theme.card,
      height: 18,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.accent,
    },
    progressBar: {
      height: '100%',
      backgroundColor: colors.bluePrimary,
      borderRadius: 8,
    },
    carouselCard: {
      padding: 20,
      borderRadius: 8,
      backgroundColor: theme.backgroundHighContrast,
      shadowColor: theme.shadow,
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.accent,
      height: '100%',
      maxHeight: 800,
    },
    tabText: {
      fontFamily: 'DMSansBold',
      color: theme.text,
      fontSize: 24,
    },
    descriptionText: {
      fontFamily: 'DMSansBold',
      color: theme.text,
      fontSize: 20,
      textAlign: 'center',
    },
    progressText: {
      fontFamily: 'DMSans',
      color: theme.text,
      fontSize: 18,
      textAlign: 'center',
    },
    image: {
      width: '50%',
      aspectRatio: 1,
      maxWidth: 200,
      maxHeight: 200,
    },
  });
};
