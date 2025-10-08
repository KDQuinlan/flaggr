import { useNavigation } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Localization from 'expo-localization';

import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import en from '@/locales/en';
import { NavigationProps } from '@/types/navigation';

const locales = Localization.getLocales();
console.log(locales[0].languageCode);

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Ionicons name="settings" size={20} color={colors.offWhite} />
          <Text style={styles.title}>Flaggr</Text>
          <TouchableOpacity>
            <Ionicons name="settings" size={20} color={colors.blueSecondary} />
          </TouchableOpacity>
        </View>
        <GameSelect
          title={en.screens.home.standard.name}
          description={en.screens.home.standard.description}
          icon="standard"
          onPress={() =>
            navigation.navigate('difficulty', {
              id: 'standard',
              title: en.screens.home.standard.name,
            })
          }
        />
        <GameSelect
          title={en.screens.home.rapid.name}
          description={en.screens.home.rapid.description}
          icon="rapid"
          onPress={() =>
            navigation.navigate('difficulty', {
              id: 'rapid',
              title: en.screens.home.rapid.name,
            })
          }
        />
        <GameSelect
          title={en.screens.home.custom.name}
          description={en.screens.home.custom.description}
          icon="custom"
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
    alignItems: 'center',
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#0073E6',
  },
});

export default HomeScreen;
