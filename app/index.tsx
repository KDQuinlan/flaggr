import React, { useEffect } from 'react';
import stateStore from '@/state/store';
import Loading from '@/app/loading';
import { hydrateStore } from '@/state/hydrate';
import HomeScreen from './home';

const IndexScreen = () => {
  const isInitialised = stateStore((state) => state.isInitialised);

  useEffect(() => {
    const loadData = async () => {
      await hydrateStore();
    };

    loadData();
  }, []);

  if (!isInitialised) return <Loading />;

  return <HomeScreen />;
};

export default IndexScreen;
