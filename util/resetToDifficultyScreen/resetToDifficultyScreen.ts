import type {
  DifficultyScreenGameIds,
  NavigationProps,
} from '@/types/navigation';

export const resetToDifficultyScreen = (
  navigation: NavigationProps,
  gameMode: DifficultyScreenGameIds
) => {
  navigation.reset({
    index: 1,
    routes: [
      { name: 'index' },
      {
        name: 'difficulty',
        params: {
          name: gameMode,
        },
      },
    ],
  });
};
