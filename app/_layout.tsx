import { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SystemUI from 'expo-system-ui';
import * as NavigationBar from 'expo-navigation-bar';
import MobileAds, {
  AdsConsent,
  AdsConsentStatus,
} from 'react-native-google-mobile-ads';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

import '@/locales/i18n';
import EnergyModal from '@/components/energyDisplay/energyModal';
import EnergyDisplay from '@/components/energyDisplay/energyDisplay';
import stateStore from '@/state/store';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { colors } from '@/components/colors';
import Loading from './loading';
import useNetworkStatus from '@/hooks/useNetworkStatus/useNetworkStatus';
import { hydrateStore } from '@/state/hydrate';
import restoreEnergyOnLoad from '@/util/restoreEnergyOnLoad/restoreEnergyOnLoad';
import PlayGames from '@/PlayGames';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import {
  REVENUE_CAT_API_KEY,
  REVENUE_CAT_TEST_API_KEY,
} from '@/constants/adId';
import determineAdRating from '@/util/determineAdRating/determineAdRating';
import calculateStreakOnLoad from '@/util/leveling/calculateStreakOnLoad';

function RootLayoutContent() {
  const { theme } = useTheme();
  const userSettings = stateStore((s) => s.userSettings);
  const { setCanShowAds, setUserDefaultPlatformName } = stateStore.getState();
  const [hasStoreHydrated, setHasStoreHydrated] = useState<boolean>(false);
  const { isPremiumUser, isDarkTheme } = stateStore((s) => s.userSettings);
  const isInitialised = stateStore((s) => s.isInitialised);

  useNetworkStatus();

  const [fontsLoaded] = useFonts({
    Chewy: require('@/assets/fonts/Chewy-Regular.ttf'),
    DMSansBold: require('@/assets/fonts/DMSans-ExtraBold.ttf'),
    DMSans: require('@/assets/fonts/DMSans-Medium.ttf'),
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useLayoutEffect(() => {
    if (isInitialised) {
      SystemUI.setBackgroundColorAsync(
        isDarkTheme ? colors.black : colors.offWhite
      );

      NavigationBar.setBackgroundColorAsync(
        isDarkTheme ? colors.black : colors.offWhite
      );
      NavigationBar.setButtonStyleAsync(isDarkTheme ? 'light' : 'dark');
    }
  }, [isDarkTheme, isInitialised]);

  useEffect(() => {
    const loadData = async () => {
      await hydrateStore();
      setUserDefaultPlatformName(
        (await PlayGames.getCurrentPlayer()).displayName
      );
      setHasStoreHydrated(true);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (hasStoreHydrated) {
      // TODO - refactor into one call (from 3 to one)
      restoreEnergyOnLoad();
      calculateStreakOnLoad();

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
  }, [hasStoreHydrated]);

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
      const isChild = age < 13;
      const isMinor = age < 18;
      const rating = determineAdRating(age);

      try {
        await MobileAds().setRequestConfiguration({
          tagForChildDirectedTreatment: isChild,
          tagForUnderAgeOfConsent: isMinor,
          maxAdContentRating: rating,
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

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        style={isDarkTheme ? 'light' : 'dark'}
        backgroundColor={theme.background}
      />

      <EnergyModal />

      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: theme.headerText,
          headerStyle: {
            backgroundColor: theme.card,
          },
          headerTitleStyle: {
            fontFamily: 'DMSansBold',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="setup"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="feedback" options={{ headerShown: true }} />
        <Stack.Screen name="settings" options={{ headerShown: true }} />
        <Stack.Screen
          name="noticeBoard"
          options={{ headerShown: true, title: 'Notice Board' }}
        />
        <Stack.Screen
          name="noticeBoardEntry"
          options={{ headerShown: true, title: 'Notice Board' }}
        />
        <Stack.Screen
          name="passport"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="passportEntry"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="difficulty"
          options={{
            headerShown: true,
            ...(!isPremiumUser && { headerRight: () => <EnergyDisplay /> }),
          }}
        />
        <Stack.Screen name="multipleChoice" options={{ headerShown: true }} />
        <Stack.Screen
          name="custom"
          options={{
            headerShown: true,
            ...(!isPremiumUser && { headerRight: () => <EnergyDisplay /> }),
          }}
        />
        <Stack.Screen
          name="customSummary"
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="summary"
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="practiceSummary"
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="stats"
          options={{
            headerShown: true,
          }}
        />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
