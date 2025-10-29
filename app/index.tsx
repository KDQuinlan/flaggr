import { useEffect, useState } from 'react';
import MobileAds from 'react-native-google-mobile-ads';
import { useFonts } from 'expo-font';

import HomeScreen from './home';
import SetupScreen from './setup';
import Loading from '@/app/loading';
import { hydrateStore } from '@/state/hydrate';
import stateStore from '@/state/store';
import PlayGames from '@/PlayGames';
import restoreEnergyOnLoad from '@/util/restoreEnergyOnLoad/restoreEnergyOnLoad';
import persistUserSettings from '@/util/persistState/persistUserSettings';

const IndexScreen = () => {
  const isInitialised = stateStore((state) => state.isInitialised);
  const userSettings = stateStore((state) => state.userSettings);
  const { setUserSettings } = stateStore.getState();
  const [hasStoreHydrated, setHasStoreHydrated] = useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Chewy: require('@/assets/fonts/Chewy-Regular.ttf'),
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const loadData = async () => {
      await hydrateStore();
      setHasStoreHydrated(true);
    };

    loadData();
  }, []);

  useEffect(() => {
    hasStoreHydrated &&
      !userSettings.isGoogleConnected &&
      (async () => {
        try {
          await PlayGames.signIn();
          setUserSettings({ ...userSettings, isGoogleConnected: true });
          persistUserSettings({ ...userSettings, isGoogleConnected: true });
        } catch (e) {
          console.error('Sign-in error:', e);
        }
      })();
  }, [hasStoreHydrated]);

  useEffect(() => {
    if (hasStoreHydrated) restoreEnergyOnLoad();
  }, [hasStoreHydrated]);

  useEffect(() => {
    if (!userSettings.isPremiumUser) {
      MobileAds().initialize();
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
