import type { NavigationProps } from '@/types/navigation';
import { StackActions } from '@react-navigation/native';

const resetToDifficultyScreen = (navigation: NavigationProps) => {
  const state = navigation.getState();
  const difficultyIndex = state.routes.findIndex(
    (r) => r.name === 'difficulty'
  );

  if (difficultyIndex >= 0) {
    const popCount = state.index - difficultyIndex;
    if (popCount > 0) {
      navigation.dispatch(StackActions.pop(popCount));
    }
  }
};

export default resetToDifficultyScreen;
