import { useEffect, useLayoutEffect, useState } from 'react';
import MobileAds from 'react-native-google-mobile-ads';
import { useFonts } from 'expo-font';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

import HomeScreen from './home';
import SetupScreen from './setup';
import Loading from '@/app/loading';
import { hydrateStore } from '@/state/hydrate';
import stateStore from '@/state/store';
import PlayGames from '@/PlayGames';
import restoreEnergyOnLoad from '@/util/restoreEnergyOnLoad/restoreEnergyOnLoad';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import {
  REVENUE_CAT_API_KEY,
  REVENUE_CAT_TEST_API_KEY,
} from '@/constants/adId';
import useNetworkStatus from '@/hooks/useNetworkStatus/useNetworkStatus';
import { Appearance } from 'react-native';
import { colors } from '@/components/colors';

const IndexScreen = () => {
  const systemScheme = Appearance.getColorScheme();
  const isSystemDark = systemScheme === 'dark';
  const isInitialised = stateStore((s) => s.isInitialised);
  const userSettings = stateStore((s) => s.userSettings);
  const [hasStoreHydrated, setHasStoreHydrated] = useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Chewy: require('@/assets/fonts/Chewy-Regular.ttf'),
    DMSansBold: require('@/assets/fonts/DMSans-ExtraBold.ttf'),
    DMSans: require('@/assets/fonts/DMSans-Medium.ttf'),
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useNetworkStatus();

  useEffect(() => {
    const loadData = async () => {
      await hydrateStore();
      setHasStoreHydrated(true);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (hasStoreHydrated) {
      restoreEnergyOnLoad();

      if (!userSettings.isGoogleConnected) {
        (async () => {
          try {
            await PlayGames.signIn();
            persistUserSettings({ ...userSettings, isGoogleConnected: true });
          } catch (e) {
            console.error('Sign-in error:', e);
          }
        })();
      }
    }
  }, []);

  useEffect(() => {
    if (!userSettings.isPremiumUser) {
      MobileAds().initialize();
    }
  }, []);

  useEffect(() => {
    if (!userSettings.isPremiumUser) {
      Purchases.setLogLevel(LOG_LEVEL.INFO);
      Purchases.configure({
        apiKey: __DEV__ ? REVENUE_CAT_TEST_API_KEY : REVENUE_CAT_API_KEY,
      });
    }
  }, []);

  if (!isInitialised || !fontsLoaded) return <Loading />;
  if (!userSettings.isSetUp) {
    return <SetupScreen />;
  } else {
    return <HomeScreen />;
  }
};

export default IndexScreen;
