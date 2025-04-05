import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Flaggr</Text>
        </View>
        <GameSelect title="Standard" description="One flag, four choices" />
        <GameSelect title="Rapid" description="Quick-fire flag questions" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#0073E6',
  },
});

export default HomeScreen;
