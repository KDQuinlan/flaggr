import { create } from 'zustand';

import {
  defaultProgressionStructure,
  defaultUserSettings,
} from './secureStoreStructure';
import {
  ProgressionStructure,
  UserSettingStructure,
} from '@/types/secureStore';

type State = {
  isInitialised: boolean;
  canShowAds: boolean;
  energyModalVisible: boolean;
  isInternetAvailable: boolean | null;
  userSettings: UserSettingStructure;
  userProgress: ProgressionStructure;
  userDefaultPlatformName: string;
};

type Actions = {
  setIsInitialised: () => void;
  setCanShowAds: () => void;
  setEnergyModalVisible: (energyModalVisible: boolean) => void;
  setIsInternetAvailable: (isInternetAvailable: boolean) => void;
  setUserSettings: (userSettings: UserSettingStructure) => void;
  setProgression: (progression: ProgressionStructure) => void;
  setUserDefaultPlatformName: (name: string) => void;
};

const stateStore = create<State & Actions>((set) => ({
  isInitialised: false,
  canShowAds: false,
  energyModalVisible: false,
  isInternetAvailable: null,
  userSettings: defaultUserSettings,
  userProgress: defaultProgressionStructure,
  userDefaultPlatformName: '',

  setIsInitialised: () => set(() => ({ isInitialised: true })),
  setCanShowAds: () => set(() => ({ canShowAds: true })),
  setEnergyModalVisible: (energyModalVisible: boolean) =>
    set(() => ({ energyModalVisible })),
  setIsInternetAvailable: (isInternetAvailable: boolean) =>
    set(() => ({ isInternetAvailable })),
  setUserSettings: (userSettings: UserSettingStructure) =>
    set(() => ({ userSettings })),
  setProgression: (progression: ProgressionStructure) =>
    set(() => ({ userProgress: progression })),
  setUserDefaultPlatformName: (userDefaultPlatformName: string) =>
    set(() => ({ userDefaultPlatformName })),
}));

export default stateStore;
