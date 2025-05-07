import type { NavigationProps } from '@/types/navigation';
import { REVERSE_NAME_MAP } from '@/constants/mappers';
import { GameMode } from '@/state/secureStoreStructure';

export const resetToDifficultyScreen = (
  navigation: NavigationProps,
  gameMode: GameMode
) => {
  navigation.reset({
    index: 1,
    routes: [
      { name: 'index' },
      {
        name: 'difficulty',
        params: {
          name: REVERSE_NAME_MAP[gameMode],
        },
      },
    ],
  });
};
