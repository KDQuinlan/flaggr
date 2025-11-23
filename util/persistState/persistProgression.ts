import { STORAGE_KEY_PROGRESSION } from '@/constants/common';
import { ProgressionStructure } from '@/types/secureStore';
import { mmkvStorage } from '@/state/mmkv';
import stateStore from '@/state/store';

const persistProgression = (updatedProgression: ProgressionStructure) => {
  const { setProgression } = stateStore.getState();

  try {
    mmkvStorage.set(
      STORAGE_KEY_PROGRESSION,
      JSON.stringify(updatedProgression)
    );
    setProgression(updatedProgression);
  } catch (e) {
    console.error('Error persisting to MMKV:', e);
  }
};

export default persistProgression;
