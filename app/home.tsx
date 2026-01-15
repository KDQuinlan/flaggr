import { useMemo, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Device from 'expo-device';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import GameSelect from '@/components/gameSelect/gameSelect';
import { NavigationProps } from '@/types/navigation';
import { APP_NAME } from '@/constants/common';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_HOME_AND_SETTINGS_ID, BANNER_TEST_ID } from '@/constants/adId';
import EnergyDisplay from '@/components/energyDisplay/energyDisplay';
import PlayGames from '@/PlayGames';
import stateStore from '@/state/store';
import { getHomeStyles } from '@/styles/home';
import { useTheme } from '@/context/ThemeContext';
import { noticeBoardEntryData } from '@/data/noticeBoardEntries';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import SocialMediaLinks from '@/components/socialMedia/socialMedia';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const { isPremiumUser, isGoogleConnected, noticeBoardLastVisitedDate } =
    stateStore((s) => s.userSettings);
  const userSettings = stateStore((s) => s.userSettings);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [bottomPadding, setBottomPadding] = useState<number>(0);
  const { t } = useTranslation('home');
  const { theme } = useTheme();
  const styles = useMemo(() => getHomeStyles(theme), [theme]);

  const handleShowLeaderboard = async () => {
    await PlayGames.showAllLeaderboards();
    setShowLeaderboard(false);
  };

  const userHasUnreadNotices = (): boolean => {
    if (!noticeBoardEntryData[0]) return false;
    if (!noticeBoardLastVisitedDate) return true;
    if (noticeBoardLastVisitedDate < noticeBoardEntryData[0].date) return true;

    return false;
  };

  const showAds = !isPremiumUser && isInternetAvailable;
  const isOnPhone = Device.deviceType === Device.DeviceType.PHONE;

  return (
    <SafeAreaProvider
      style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <View style={styles.iconsContainer}>
            <Pressable
              onPress={() => navigation.navigate('settings')}
              accessibilityRole="button"
              accessibilityLabel={t('title', { ns: 'settings' })}
              hitSlop={10}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <Image
                style={styles.settingsIcon}
                source={require('@/assets/images/icons/resources/settings.png')}
              />
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate('noticeBoard');
                userHasUnreadNotices() &&
                  persistUserSettings({
                    ...userSettings,
                    noticeBoardLastVisitedDate: Date.now(),
                  });
              }}
              accessibilityRole="button"
              accessibilityLabel={t('title', { ns: 'settings' })}
              hitSlop={10}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <Image
                style={styles.settingsIcon}
                source={
                  userHasUnreadNotices()
                    ? require('@/assets/images/icons/resources/notification.png')
                    : require('@/assets/images/icons/resources/notification-empty.png')
                }
              />
            </Pressable>
          </View>

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
          elevation={4}
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
          elevation={3}
        />

        <GameSelect
          id="custom"
          title={t('custom.title')}
          description={t('custom.description')}
          icon="custom"
          onPress={() => navigation.navigate('custom')}
          elevation={2.5}
        />

        <GameSelect
          id="passport"
          title={t('passport.title')}
          description={t('passport.description')}
          icon="passport"
          onPress={() => navigation.navigate('passport')}
          elevation={2}
        />

        <SocialMediaLinks />
      </ScrollView>
      <View
        style={{
          ...styles.anchorContainer,
          bottom: showAds ? bottomPadding : 0,
        }}
      >
        <View
          style={{
            ...styles.floatingButtonContainer,
            paddingBottom: insets.bottom,
          }}
        >
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

          {isInternetAvailable && isOnPhone && isGoogleConnected && (
            <Pressable
              style={({ pressed }) => [
                styles.floatingButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              disabled={showLeaderboard}
              onPress={handleShowLeaderboard}
            >
              <Image
                style={styles.floatingIcon}
                source={require('@/assets/images/icons/resources/leaderboard.png')}
              />
            </Pressable>
          )}
        </View>
      </View>
      {showAds && (
        <AdBanner
          adId={__DEV__ ? BANNER_TEST_ID : BANNER_HOME_AND_SETTINGS_ID}
          onHeightChange={(height) => setBottomPadding(height)}
        />
      )}
    </SafeAreaProvider>
  );
};

export default HomeScreen;
