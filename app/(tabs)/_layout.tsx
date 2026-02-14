import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/components/colors';

export default function TabLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.bluePrimary,
        tabBarInactiveTintColor: theme.text,
        tabBarActiveBackgroundColor: theme.background,
        tabBarInactiveBackgroundColor: theme.background,
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.background,
          shadowColor: theme.shadow,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home', { ns: 'home' }),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? colors.bluePrimary : theme.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile', { ns: 'profile' }),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? colors.bluePrimary : theme.text}
            />
          ),
        }}
      />
    </Tabs>
  );
}
