import { SCREEN_MAX_WIDTH } from '@/constants/common';
import { StyleSheet } from 'react-native';

export const getPracticeSummaryStyles = () => {
  return StyleSheet.create({
    comparisonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: SCREEN_MAX_WIDTH,
    },
    comparisonItemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    comparisonNumericContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
  });
};
