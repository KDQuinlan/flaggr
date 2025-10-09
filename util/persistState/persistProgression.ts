import * as SecureStore from 'expo-secure-store';

import { STORAGE_KEY_PROGRESSION } from '@/constants/common';
import { type ProgressionStructure } from '@/state/secureStoreStructure';

const persistProgression = async (updatedProgression: ProgressionStructure) => {
  try {
    await SecureStore.setItemAsync(
      STORAGE_KEY_PROGRESSION,
      JSON.stringify(updatedProgression)
    );
    console.log('Persisted to SecureStore:', updatedProgression);
  } catch (error) {
    console.error('Error persisting to SecureStore:', error);
  }
};

export default persistProgression;
