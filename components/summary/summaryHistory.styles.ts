import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';

export const getSummaryHistoryStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    historyContainer: {
      gap: 5,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    historyItemsContainer: {
      gap: 5,
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    historyItems: { height: 16, width: 16, borderRadius: 4 },
    valueText: { fontFamily: 'DMSansBold', color: theme.text, fontSize: 20 },
  });
};
