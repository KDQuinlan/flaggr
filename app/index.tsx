import { useEffect } from 'react';
import MobileAds from 'react-native-google-mobile-ads';

import HomeScreen from './home';
import SetupScreen from './setup';
import Loading from '@/app/loading';
import { hydrateStore } from '@/state/hydrate';
import stateStore from '@/state/store';
import PlayGames from '@/PlayGames'

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
  (async () => {
    try {
      const signedIn = await PlayGames.signIn();
      console.log(signedIn ? "✅ Signed in" : "❌ Not signed in");
    } catch (e) {
      console.error("Sign-in error:", e);
    }
  })();
}, []);

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
