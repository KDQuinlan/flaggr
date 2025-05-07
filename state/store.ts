import { create } from 'zustand';
import {
  GameMode,
  Levels,
  ProgressionStructure,
  defaultProgressionStructure,
} from './secureStoreStructure';
import { ScreenNames } from '@/types/navigation';

type State = {
  isInitialised: boolean;
  userProgress: ProgressionStructure;
};

type Actions = {
  setIsInitialised: () => void;
  setProgression: (progression: ProgressionStructure) => void;
};

const stateStore = create<State & Actions>((set) => ({
  isInitialised: false,
  userProgress: defaultProgressionStructure,

  setIsInitialised: () => set(() => ({ isInitialised: true })),
  setProgression: (progression: ProgressionStructure) =>
    set(() => ({ userProgress: progression })),
}));

export default stateStore;
