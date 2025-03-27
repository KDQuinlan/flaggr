import React from 'react';
import { View, Button, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';

import countries from "../assets/data/countries.json";

const IndexScreen = () => {
  const router = useRouter();

  const navigateToGames = () => {
    router.push('/games');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Go to Games" onPress={navigateToGames} />
    </View>
  );
};

export default IndexScreen;
