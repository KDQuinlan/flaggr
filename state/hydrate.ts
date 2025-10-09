import * as SecureStore from 'expo-secure-store';

import i18n from '@/locales/i18n';
import stateStore from './store';
import {
  STORAGE_KEY_PROGRESSION,
  STORAGE_KEY_SETTINGS,
} from '@/constants/common';
import {
  defaultProgressionStructure,
  defaultUserSettings,
} from './secureStoreStructure';

// TODO - Implement versioning
// TODO - add error handling and parallel reads

export const hydrateStore = async () => {
  const { setIsInitialised, setUserSettings, setProgression } =
    stateStore.getState();

  const userSettings = await SecureStore.getItemAsync(STORAGE_KEY_SETTINGS);
  const userProgression = await SecureStore.getItemAsync(
    STORAGE_KEY_PROGRESSION
  );

  // Restore progression or initialize default
  if (userProgression) {
    setProgression(JSON.parse(userProgression));
  } else {
    await SecureStore.setItemAsync(
      STORAGE_KEY_PROGRESSION,
      JSON.stringify(defaultProgressionStructure)
    );
  }

  // Restore user settings or initialize default
  if (userSettings) {
    setUserSettings(JSON.parse(userSettings));
  } else {
    await SecureStore.setItemAsync(
      STORAGE_KEY_SETTINGS,
      JSON.stringify(defaultUserSettings)
    );
    i18n.changeLanguage(defaultUserSettings.locale);
  }

  // Signal ready
  setIsInitialised();
};
