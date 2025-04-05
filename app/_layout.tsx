import { colors } from '@/components/colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.offWhite }}>
      <StatusBar style="dark" backgroundColor={colors.offWhite} />
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Flaggr',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="games"
          options={{
            title: 'Games',
            headerShown: true,
          }}
        />
      </Stack>
    </View>
  );
}
