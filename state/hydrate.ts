import { Appearance } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Network from 'expo-network';
import i18n from '@/locales/i18n';
import Purchases from 'react-native-purchases';

import stateStore from './store';
import {
  STORAGE_KEY_PROGRESSION,
  STORAGE_KEY_SETTINGS,
} from '@/constants/common';
import {
  defaultProgressionStructure,
  defaultUserSettings,
} from './secureStoreStructure';
import { UserSettingStructure } from '@/types/secureStore';

// TODO - Implement versioning
// TODO - add parallel reads?

export const hydrateStore = async () => {
  const systemScheme = Appearance.getColorScheme();
  const isSystemDark = systemScheme === 'dark';
  const networkState = await Network.getNetworkStateAsync();
  const { setIsInitialised, setUserSettings, setProgression } =
    stateStore.getState();

  const userSettingsSecure =
    await SecureStore.getItemAsync(STORAGE_KEY_SETTINGS);
  const userProgressionSecure = await SecureStore.getItemAsync(
    STORAGE_KEY_PROGRESSION
  );

  const cachedUserSettings = userSettingsSecure
    ? JSON.parse(userSettingsSecure)
    : {
        ...defaultUserSettings,
        isDarkTheme: isSystemDark,
      };

  const applyUserSettings = async (settings: UserSettingStructure) => {
    setUserSettings(settings);
    await SecureStore.setItemAsync(
      STORAGE_KEY_SETTINGS,
      JSON.stringify(settings)
    );
  };

  // Restore user settings or intialise default using server-side
  if (networkState.isConnected && networkState.isInternetReachable) {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const isPremium =
        customerInfo.entitlements.active['premium'] !== undefined;
      const updated = { ...cachedUserSettings, isPremiumUser: isPremium };

      await applyUserSettings(updated);
    } catch (e) {
      console.log(`Error fetching customer info: ${e}`);
      await applyUserSettings(cachedUserSettings);
    }
  } else {
    await applyUserSettings(cachedUserSettings);
  }

  // Restore progression or initialize default
  if (userProgressionSecure) {
    setProgression(JSON.parse(userProgressionSecure));
  } else {
    await SecureStore.setItemAsync(
      STORAGE_KEY_PROGRESSION,
      JSON.stringify(defaultProgressionStructure)
    );
  }

  const { userSettings } = stateStore.getState();
  i18n.changeLanguage(userSettings.locale);

  setIsInitialised();
};
