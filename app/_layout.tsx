import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

import '@/locales/i18n';
import { colors } from '@/components/colors';
import EnergyModal from '@/components/energyDisplay/energyModal';
import EnergyDisplay from '@/components/energyDisplay/energyDisplay';
import stateStore from '@/state/store';

// TODO - fix navigation bar becoming black on dropdown usage

export default function RootLayout() {
  const { isPremiumUser } = stateStore((state) => state.userSettings);

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
          headerTintColor: colors.bluePrimary,
          headerStyle: {
            backgroundColor: colors.offWhite,
          },
          headerTitleStyle: {
            fontFamily: 'DMSansBold',
          },
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
        <Stack.Screen name="feedback" options={{ headerShown: true }} />
        <Stack.Screen name="settings" options={{ headerShown: true }} />
        <Stack.Screen
          name="difficulty"
          options={{
            headerShown: true,
            ...(!isPremiumUser && { headerRight: () => <EnergyDisplay /> }),
          }}
        />
        <Stack.Screen name="multipleChoice" options={{ headerShown: true }} />
        <Stack.Screen
          name="custom"
          options={{
            headerShown: true,
            ...(!isPremiumUser && { headerRight: () => <EnergyDisplay /> }),
          }}
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
