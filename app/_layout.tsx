import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

import '@/locales/i18n';
import { colors } from '@/components/colors';
import EnergyModal from '@/components/energyDisplay/energyModal';
import EnergyDisplay from '@/components/energyDisplay/energyDisplay';

// TODO - fix navigation bar becoming black on dropdown usage

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.offWhite);
    NavigationBar.setButtonStyleAsync('dark');
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.offWhite }}>
      <StatusBar style="dark" backgroundColor={colors.offWhite} />
      <EnergyModal />
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.offWhite,
          },
          headerTintColor: colors.bluePrimary,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="setup"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="settings" options={{ headerShown: true }} />
        <Stack.Screen
          name="difficulty"
          options={{ headerShown: true, headerRight: () => <EnergyDisplay /> }}
        />
        <Stack.Screen name="multipleChoice" options={{ headerShown: true }} />
        <Stack.Screen
          name="custom"
          options={{ headerShown: true, headerRight: () => <EnergyDisplay /> }}
        />
        <Stack.Screen
          name="customSummary"
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="summary"
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackVisible: false,
          }}
        />
      </Stack>
    </View>
  );
}
