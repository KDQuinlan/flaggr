import { STORAGE_KEY } from '@/constants/common';
import { type ProgressionStructure } from '@/state/secureStoreStructure';
import * as SecureStore from 'expo-secure-store';

const persistProgression = async (updatedProgression: ProgressionStructure) => {
  try {
    await SecureStore.setItemAsync(
      STORAGE_KEY,
      JSON.stringify(updatedProgression)
    );
    console.log('Persisted to SecureStore:', updatedProgression);
  } catch (error) {
    console.error('Error persisting to SecureStore:', error);
  }
};

export default persistProgression;
