import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';
import stateStore from '@/state/store';
import Loading from '@/app/loading';
import { hydrateStore } from '@/state/hydrate';

const IndexScreen = () => {
  const isInitialised = stateStore((state) => state.isInitialised)
  const router = useRouter();

  const navigateToGames = () => {
    router.push('/games');
  };

  useEffect(() => {
    const loadData = async () => {
      await hydrateStore();
    };

    loadData();
  }, []);

  if (!isInitialised) return <Loading />

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Games" onPress={navigateToGames} />
    </View>
  );
};

export default IndexScreen;
