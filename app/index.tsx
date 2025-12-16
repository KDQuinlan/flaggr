import { useEffect, useState } from 'react';
import MobileAds, {
  AdsConsent,
  AdsConsentStatus,
} from 'react-native-google-mobile-ads';
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
  AGE_GROUP_TO_RATING,
  REVENUE_CAT_API_KEY,
  REVENUE_CAT_TEST_API_KEY,
} from '@/constants/adId';
import useNetworkStatus from '@/hooks/useNetworkStatus/useNetworkStatus';

const IndexScreen = () => {
  const isInitialised = stateStore((s) => s.isInitialised);
  const userSettings = stateStore((s) => s.userSettings);
  const { setCanShowAds } = stateStore.getState();
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
    const initAdSequence = async () => {
      if (
        !userSettings.isSetUp ||
        userSettings.isPremiumUser ||
        !userSettings.userAgeForPersonalisation
      ) {
        return;
      }

      const age = userSettings.userAgeForPersonalisation;
      const isMinor = age < 18;

      try {
        await MobileAds().setRequestConfiguration({
          tagForChildDirectedTreatment: age < 13,
          tagForUnderAgeOfConsent: isMinor,
          maxAdContentRating: AGE_GROUP_TO_RATING[age],
        });

        if (!isMinor) {
          try {
            const consentInfo = await AdsConsent.requestInfoUpdate();
            if (
              consentInfo.isConsentFormAvailable &&
              consentInfo.status === AdsConsentStatus.REQUIRED
            ) {
              await AdsConsent.loadAndShowConsentFormIfRequired();
            }
          } catch (consentError) {
            console.log('Consent flow error:', consentError);
          }
        }

        await MobileAds().initialize();
        setCanShowAds();
      } catch (e) {
        console.error('Ad sequence failed', e);
      }
    };

    initAdSequence();
  }, [
    userSettings.isSetUp,
    userSettings.isPremiumUser,
    userSettings.userAgeForPersonalisation,
  ]);

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
