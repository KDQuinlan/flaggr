import * as SecureStore from 'expo-secure-store';

import { STORAGE_KEY_SETTINGS } from '@/constants/common';
import { UserSettingStructure } from '@/state/secureStoreStructure';

const persistLocale = async (updatedLocale: UserSettingStructure) => {
  try {
    await SecureStore.setItemAsync(
      STORAGE_KEY_SETTINGS,
      JSON.stringify(updatedLocale)
    );
    console.log('Persisted to SecureStore:', updatedLocale);
  } catch (error) {
    console.error('Error persisting to SecureStore:', error);
  }
};

export default persistLocale;
