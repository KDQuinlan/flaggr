import { useEffect } from 'react';
import MobileAds from 'react-native-google-mobile-ads';

import HomeScreen from './home';
import SetupScreen from './setup';
import Loading from '@/app/loading';
import { hydrateStore } from '@/state/hydrate';
import stateStore from '@/state/store';

const IndexScreen = () => {
  const isInitialised = stateStore((state) => state.isInitialised);
  const userSettings = stateStore((state) => state.userSettings);

  useEffect(() => {
    const loadData = async () => {
      await hydrateStore();
    };

    loadData();
  }, []);

  useEffect(() => {
    MobileAds().initialize();
  }, []);

  if (!isInitialised) return <Loading />;
  if (!userSettings.isSetup) {
    return <SetupScreen />;
  } else {
    return <HomeScreen />;
  }
};

export default IndexScreen;
