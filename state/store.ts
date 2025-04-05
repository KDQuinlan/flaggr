import { create } from 'zustand';
import {
  defaultProgressionStructure,
  DefaultProgressionStructure,
} from './secureStoreStructure';

type State = {
  isInitialised: boolean;
  userProgress: DefaultProgressionStructure;
};

type Actions = {
  setIsInitialised: () => void;
  setProgression: (progression: DefaultProgressionStructure) => void;
};

const stateStore = create<State & Actions>((set) => ({
  isInitialised: false,
  userProgress: defaultProgressionStructure,

  setIsInitialised: () => set(() => ({ isInitialised: true })),
  setProgression: (progression: DefaultProgressionStructure) =>
    set(() => ({ userProgress: progression })),
}));

export default stateStore;
