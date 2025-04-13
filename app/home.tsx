import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import en from '@/locales/en';
import { NavigationProps } from '@/types/navigation';
import { useNavigation } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{en.home.title}</Text>
        </View>
        <GameSelect
          title={en.games.standard.name}
          description={en.games.standard.description}
          onPress={() =>
            navigation.navigate('difficulty', { name: en.games.standard.name })
          }
        />
        <GameSelect
          title={en.games.rapid.name}
          description={en.games.rapid.description}
          onPress={() =>
            navigation.navigate('difficulty', { name: en.games.rapid.name })
          }
        />
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
