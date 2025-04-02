import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import stateStore from '@/state/store';
import Loading from '@/app/loading';
import { hydrateStore } from '@/state/hydrate';

const IndexScreen = () => {
  const isInitialised = stateStore((state) => state.isInitialised)
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      await hydrateStore();
    };

    loadData();
  }, []);

  if (!isInitialised) return <Loading />

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1' }}>
      <Text>Hello</Text>
    </View>
  );
};

export default IndexScreen;
