import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getSummaryInfoRowStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    summaryInfoContainer: {
      width: '50%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: { fontFamily: 'DMSansBold', color: theme.text },
    value: { fontFamily: 'DMSans', color: theme.text },
  });
};
