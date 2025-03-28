import * as SecureStore from 'expo-secure-store';
import stateStore from './store';
import { STORAGE_KEY } from '@/constants/common';
import { defaultProgressionStructure } from './secureStoreStructure';

// TODO - Implement versioning

export const hydrateStore = async () => {
  const { setIsInitialised } = stateStore.getState();
  const existing = await SecureStore.getItemAsync(STORAGE_KEY);

  if (existing) {
    console.log("State exists: hydrating!")
    setIsInitialised();
    console.log("State initialised")
  } else {
    console.log("State does not exist - creating")
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(defaultProgressionStructure));
    console.log("State created!")
    setIsInitialised();
  }
};
