import * as SecureStore from 'expo-secure-store';

import { STORAGE_KEY_SETTINGS } from '@/constants/common';
import stateStore from '@/state/store';
import { UserSettingStructure } from '@/types/secureStore';

const persistUserSettings = async (updatedSettings: UserSettingStructure) => {
  const { setUserSettings } = stateStore.getState();
  try {
    await SecureStore.setItemAsync(
      STORAGE_KEY_SETTINGS,
      JSON.stringify(updatedSettings)
    );
    setUserSettings(updatedSettings);
    console.log('Persisted to SecureStore:', updatedSettings);
  } catch (error) {
    console.error('Error persisting locale to SecureStore:', error);
  }
};

export default persistUserSettings;
