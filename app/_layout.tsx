import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Flaggr',
          // headerStyle: { backgroundColor: '#4CAF50' },
          // headerTintColor: '#fff',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="games" 
        options={{
          title: 'Games',
          // headerStyle: { backgroundColor: '#4CAF50' },
          // headerTintColor: '#fff',
          headerShown: true
        }}  
      />
    </Stack>
  );
}
