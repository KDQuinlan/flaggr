import type { NavigationProps } from '@/types/navigation';
import { StackActions } from '@react-navigation/native';

// TODO - refactor to just use popTo?

const resetToDifficultyScreen = (
  navigation: NavigationProps,
  screen: 'custom' | 'difficulty'
) => {
  const state = navigation.getState();
  const screenIndex = state.routes.findIndex((r) => r.name === screen);

  if (screenIndex >= 0) {
    const popCount = state.index - screenIndex;
    if (popCount > 0) {
      navigation.dispatch(StackActions.pop(popCount));
    }
  } else {
    navigation.popTo('difficulty', {
      id: 'standard',
      title: 'Standard',
    });
  }
};

export default resetToDifficultyScreen;
