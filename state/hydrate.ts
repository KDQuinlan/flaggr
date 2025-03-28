import * as SecureStore from 'expo-secure-store';
import stateStore from './store';
import { STORAGE_KEY } from '@/constants/common';
import { defaultProgressionStructure } from './secureStoreStructure';

// TODO - Implement versioning

export const hydrateStore = async () => {
  const { setIsInitialised, setProgression } = stateStore.getState();
  const userProgression = await SecureStore.getItemAsync(STORAGE_KEY);

  if (userProgression) {
    setProgression(JSON.parse(userProgression));
    setIsInitialised();
  } else {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(defaultProgressionStructure));
    setIsInitialised();
  }
};
