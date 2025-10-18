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
  energyModalVisible: boolean;
  userSettings: UserSettingStructure;
  userProgress: ProgressionStructure;
};

type Actions = {
  setIsInitialised: () => void;
  setEnergyModalVisible: (energyModalVisible: boolean) => void;
  setUserSettings: (userSettings: UserSettingStructure) => void;
  setProgression: (progression: ProgressionStructure) => void;
};

const stateStore = create<State & Actions>((set) => ({
  isInitialised: false,
  energyModalVisible: false,
  userSettings: defaultUserSettings,
  userProgress: defaultProgressionStructure,

  setIsInitialised: () => set(() => ({ isInitialised: true })),
  setEnergyModalVisible: (energyModalVisible: boolean) =>
    set(() => ({ energyModalVisible })),
  setUserSettings: (userSettings: UserSettingStructure) =>
    set(() => ({ userSettings })),
  setProgression: (progression: ProgressionStructure) =>
    set(() => ({ userProgress: progression })),
}));

export default stateStore;
