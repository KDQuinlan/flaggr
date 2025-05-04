import { create } from 'zustand';
import {
  GameMode,
  Levels,
  ProgressionStructure,
  defaultProgressionStructure,
} from './secureStoreStructure';
import { ScreenNames } from '@/types/navigation';

export type ScreenInformation = {
  screenTitle: ScreenNames;
  gameMode: GameMode | null;
  difficulty: Levels | null;
};

type State = {
  isInitialised: boolean;
  screenInformation: ScreenInformation;
  userProgress: ProgressionStructure;
};

type Actions = {
  setIsInitialised: () => void;
  setScreenInformation: (screenInformation: ScreenInformation) => void;
  setProgression: (progression: ProgressionStructure) => void;
};

const stateStore = create<State & Actions>((set) => ({
  isInitialised: false,
  screenInformation: { screenTitle: 'Index', gameMode: null, difficulty: null },
  userProgress: defaultProgressionStructure,

  setIsInitialised: () => set(() => ({ isInitialised: true })),
  setScreenInformation: (screenInformation: ScreenInformation) =>
    set(() => ({ screenInformation })),
  setProgression: (progression: ProgressionStructure) =>
    set(() => ({ userProgress: progression })),
}));

export default stateStore;
