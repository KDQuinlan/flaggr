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

// TODO - make mastery gamemode to go through specific continents/regions?

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
            navigation.navigate('difficulty', {
              id: en.games.standard.id,
              title: en.games.standard.name,
            })
          }
        />
        <GameSelect
          title={en.games.rapid.name}
          description={en.games.rapid.description}
          onPress={() =>
            navigation.navigate('difficulty', {
              id: en.games.rapid.id,
              title: en.games.rapid.name,
            })
          }
        />
        <GameSelect
          title={en.games.custom.name}
          description={en.games.custom.description}
          onPress={() => navigation.navigate('custom')}
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
