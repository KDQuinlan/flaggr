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
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import { NavigationProps } from '@/types/navigation';
import { APP_NAME } from '@/constants/common';

const adUnitId = TestIds.BANNER;

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
          <Text style={styles.title}>{APP_NAME}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('settings')}
            accessibilityRole="button"
            accessibilityLabel={t('title', { ns: 'settings' })}
          >
            <Ionicons name="settings" size={20} color={colors.blueSecondary} />
          </TouchableOpacity>
        </View>

        <GameSelect
          id="standard"
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
          id="rapid"
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
          id="custom"
          title={t('custom.title')}
          description={t('custom.description')}
          icon="custom"
          onPress={() => navigation.navigate('custom')}
        />
      </ScrollView>

      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => console.error(error)}
      />
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
  adContainer: {
    alignItems: 'center',
  },
});

export default HomeScreen;
