import { create } from 'zustand';

import {
  ProgressionStructure,
  UserSettingStructure,
  defaultProgressionStructure,
  defaultUserSettings,
} from './secureStoreStructure';

type State = {
  isInitialised: boolean;
  userSettings: UserSettingStructure;
  userProgress: ProgressionStructure;
};

type Actions = {
  setIsInitialised: () => void;
  setUserSettings: (userSettings: UserSettingStructure) => void;
  setProgression: (progression: ProgressionStructure) => void;
};

const stateStore = create<State & Actions>((set) => ({
  isInitialised: false,
  userSettings: defaultUserSettings,
  userProgress: defaultProgressionStructure,

  setIsInitialised: () => set(() => ({ isInitialised: true })),
  setUserSettings: (userSettings: UserSettingStructure) =>
    set(() => ({ userSettings })),
  setProgression: (progression: ProgressionStructure) =>
    set(() => ({ userProgress: progression })),
}));

export default stateStore;
