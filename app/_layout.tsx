import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      headerTitleAlign: 'center',
    }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Flaggr',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="games" 
        options={{
          title: 'Games',
          headerShown: true
        }}  
      />
    </Stack>
  );
}
