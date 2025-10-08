import { create } from 'zustand';

import {
  ProgressionStructure,
  defaultProgressionStructure,
} from './secureStoreStructure';

type State = {
  isInitialised: boolean;
  locale: string;
  userProgress: ProgressionStructure;
};

type Actions = {
  setIsInitialised: () => void;
  setUserSettings: (locale: string) => void;
  setProgression: (progression: ProgressionStructure) => void;
};

const stateStore = create<State & Actions>((set) => ({
  isInitialised: false,
  locale: 'en',
  userProgress: defaultProgressionStructure,

  setIsInitialised: () => set(() => ({ isInitialised: true })),
  setUserSettings: (locale: string) => set(() => ({ locale })),
  setProgression: (progression: ProgressionStructure) =>
    set(() => ({ userProgress: progression })),
}));

export default stateStore;
