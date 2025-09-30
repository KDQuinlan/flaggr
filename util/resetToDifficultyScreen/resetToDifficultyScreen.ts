import type { NavigationProps } from '@/types/navigation';
import { StackActions } from '@react-navigation/native';

export const resetToDifficultyScreen = (navigation: NavigationProps) => {
  const state = navigation.getState();

  navigation.dispatch(StackActions.pop(state.routes.length - 2));
};
