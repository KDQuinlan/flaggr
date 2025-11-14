import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { getSummaryInfoRowStyles } from './summaryInfoRow.styles';

const SummaryInfoRow = ({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getSummaryInfoRowStyles(theme), [theme]);
  return (
    <View style={styles.summaryInfoContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryInfoContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: { fontFamily: 'DMSansBold' },
  value: { fontFamily: 'DMSans' },
});

export default SummaryInfoRow;
