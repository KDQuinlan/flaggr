import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import { NavigationProps } from '@/types/navigation';
import { APP_NAME } from '@/constants/common';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_TEST_ID } from '@/constants/adId';
import EnergyDisplay from '@/components/energyDisplay/energyDisplay';
import PlayGames from '@/PlayGames';
import stateStore from '@/state/store';

// TODO - Shorten localisation country names for better UI usage
// TODO - convert TouchableOpacity buttons to use Pressable

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isPremiumUser } = stateStore((state) => state.userSettings);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const { t } = useTranslation('home');

  useEffect(() => {
    showLeaderboard && PlayGames.showAllLeaderboards();
    setTimeout(() => setShowLeaderboard(false), 250);
  }, [showLeaderboard]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('settings')}
            accessibilityRole="button"
            accessibilityLabel={t('title', { ns: 'settings' })}
            hitSlop={10}
          >
            <Image
              style={styles.settingsIcon}
              source={require('@/assets/images/icons/resources/custom/cog.png')}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{APP_NAME}</Text>
          </View>
          {!isPremiumUser && <EnergyDisplay />}
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
      <View style={styles.floatingButtonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.floatingButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => navigation.navigate('feedback')}
        >
          <Image
            style={styles.floatingIcon}
            source={require('@/assets/images/icons/resources/feedback.png')}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.floatingButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => setShowLeaderboard(true)}
        >
          <Image
            style={styles.floatingIcon}
            source={require('@/assets/images/icons/resources/leaderboard.png')}
          />
        </Pressable>
      </View>
      {!isPremiumUser && <AdBanner adId={BANNER_TEST_ID} />}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  title: {
    fontSize: 40,
    color: '#0073E6',
    fontFamily: 'Chewy',
  },
  settingsIcon: {
    height: 25,
    width: 25,
  },
  floatingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  floatingButton: {
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  floatingIcon: { width: 50, height: 50 },
});

export default HomeScreen;
