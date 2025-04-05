import { Text, View, StyleSheet } from 'react-native';

export default function Games() {
  return (
    <View style={styles.container}>
      <Text>Games screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
