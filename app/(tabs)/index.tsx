import { Redirect } from 'expo-router';

import HomeScreen from '../home';
import stateStore from '@/state/store';

const IndexScreen = () => {
  const userSettings = stateStore((s) => s.userSettings);

  if (!userSettings.isSetUp) return <Redirect href="/setup" />;

  return <HomeScreen />;
};

export default IndexScreen;
