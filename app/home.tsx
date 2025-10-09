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
import { useTranslation } from 'react-i18next';
// import i18n from '@/locales/i18n';
// onPress={() => i18n.changeLanguage('es')}

import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import { NavigationProps } from '@/types/navigation';

// TODO - Shorten localisation country names for better UI usage

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('home');
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
          title={t('standard.title')}
          description={t('standard.description')}
          icon="standard"
          onPress={() =>
            navigation.navigate('difficulty', {
              id: 'standard',
              title: 'Standard',
            })
          }
        />
        <GameSelect
          title={t('rapid.title')}
          description={t('rapid.description')}
          icon="rapid"
          onPress={() =>
            navigation.navigate('difficulty', {
              id: 'rapid',
              title: 'Rapid',
            })
          }
        />
        <GameSelect
          title={t('custom.title')}
          description={t('custom.description')}
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
