import { View, Text, StyleSheet } from 'react-native';

const SummaryInfoRow = ({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) => (
  <View style={styles.summaryInfoContainer}>
    <Text>{title}</Text>
    <Text>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  summaryInfoContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SummaryInfoRow;
