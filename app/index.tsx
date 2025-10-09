import React, { useEffect } from 'react';

import HomeScreen from './home';
import SetupScreen from './setup';
import Loading from '@/app/loading';
import { hydrateStore } from '@/state/hydrate';
import stateStore from '@/state/store';

// TODO - Add check for SetupScreen and go to home automatically

const IndexScreen = () => {
  const isInitialised = stateStore((state) => state.isInitialised);

  useEffect(() => {
    const loadData = async () => {
      await hydrateStore();
    };

    loadData();
  }, []);

  if (!isInitialised) return <Loading />;

  return <SetupScreen />;
};

export default IndexScreen;
