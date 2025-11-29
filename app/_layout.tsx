import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

import '@/locales/i18n';
import EnergyModal from '@/components/energyDisplay/energyModal';
import EnergyDisplay from '@/components/energyDisplay/energyDisplay';
import stateStore from '@/state/store';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function RootLayoutContent() {
  const { theme } = useTheme();
  const { isPremiumUser, isDarkTheme } = stateStore((s) => s.userSettings);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.background);
    NavigationBar.setButtonStyleAsync(isDarkTheme ? 'light' : 'dark');
  }, [isDarkTheme, theme]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        style={isDarkTheme ? 'light' : 'dark'}
        backgroundColor={theme.background}
      />

      <EnergyModal />
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: theme.headerText,
          headerStyle: {
            backgroundColor: theme.card,
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
          name="passport"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="passportEntry"
          options={{
            headerShown: true,
          }}
        />
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

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
