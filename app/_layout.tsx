import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '@/locales/i18n'; // initialize translations

import { colors } from '@/components/colors';
import en from '@/locales/en';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.offWhite }}>
      <StatusBar style="dark" backgroundColor={colors.offWhite} />
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
          name="difficulty"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="multipleChoice"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="custom"
          options={{
            headerShown: true,
            title: en.screens.home.custom.name,
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
