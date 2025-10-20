import { useEffect, useState } from 'react';
import MobileAds from 'react-native-google-mobile-ads';

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
    MobileAds().initialize();
  }, []);

  if (!isInitialised) return <Loading />;
  if (!userSettings.isSetUp) {
    return <SetupScreen />;
  } else {
    return <HomeScreen />;
  }
};

export default IndexScreen;
