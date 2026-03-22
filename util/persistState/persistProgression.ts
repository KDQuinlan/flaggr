import PlayGames from '@/PlayGames';
import { STORAGE_KEY_PROGRESSION } from '@/constants/common';
import { ProgressionStructure } from '@/types/secureStore';
import { mmkvStorage } from '@/state/mmkv';
import stateStore from '@/state/store';

const persistProgression = (updatedProgression: ProgressionStructure) => {
  const { setProgression, userSettings } = stateStore.getState();

  try {
    mmkvStorage.set(
      STORAGE_KEY_PROGRESSION,
      JSON.stringify(updatedProgression)
    );
    setProgression(updatedProgression);
    userSettings.isGoogleConnected &&
      PlayGames.saveGame(
        STORAGE_KEY_PROGRESSION,
        JSON.stringify(updatedProgression)
      );
  } catch (e) {
    console.error('Error persisting progression:', e);
  }
};

export default persistProgression;
