import { colors } from '@/components/colors';
import { SafeAreaView, StyleSheet } from 'react-native';

const Custom = () => {
  return <SafeAreaView style={styles.rootContainer}></SafeAreaView>;
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
});

export default Custom;
