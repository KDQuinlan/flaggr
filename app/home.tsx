import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import GameSelect from '@/components/gameSelect/gameSelect';
import { NavigationProps } from '@/types/navigation';
import { APP_NAME } from '@/constants/common';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_TEST_ID } from '@/constants/adId';
import EnergyDisplay from '@/components/energyDisplay/energyDisplay';
import PlayGames from '@/PlayGames';
import stateStore from '@/state/store';
import { getHomeStyles } from '@/styles/home';
import { useTheme } from '@/context/ThemeContext';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const { isPremiumUser } = stateStore((s) => s.userSettings);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const { t } = useTranslation('home');
  const { theme } = useTheme();
  const styles = useMemo(() => getHomeStyles(theme), [theme]);

  const showAds = !isPremiumUser && isInternetAvailable;

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
          <Pressable
            onPress={() => navigation.navigate('settings')}
            accessibilityRole="button"
            accessibilityLabel={t('title', { ns: 'settings' })}
            hitSlop={10}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Image
              style={styles.settingsIcon}
              source={require('@/assets/images/icons/resources/custom/cog.png')}
            />
          </Pressable>

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

        <GameSelect
          id="passport"
          title={t('passport.title')}
          description={t('passport.description')}
          icon="passport"
          onPress={() => navigation.navigate('passport')}
        />
      </ScrollView>
      <View style={styles.anchorContainer}>
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

        {showAds && <AdBanner adId={BANNER_TEST_ID} />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
