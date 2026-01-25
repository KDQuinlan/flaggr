import { useMemo } from 'react';
import { useNavigation } from 'expo-router';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { NavigationProps } from '@/types/navigation';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_HOME_AND_SETTINGS_ID, BANNER_TEST_ID } from '@/constants/adId';
import stateStore from '@/state/store';
import { getHomeStyles } from '@/styles/home';
import { useTheme } from '@/context/ThemeContext';

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const { isPremiumUser } = stateStore((s) => s.userSettings);
  const { t } = useTranslation('home');
  const { theme } = useTheme();
  const styles = useMemo(() => getHomeStyles(theme), [theme]);

  const showAds = !isPremiumUser && isInternetAvailable;

  return (
    <SafeAreaProvider
      style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      ></ScrollView>

      {showAds && (
        <AdBanner
          adId={__DEV__ ? BANNER_TEST_ID : BANNER_HOME_AND_SETTINGS_ID}
        />
      )}
    </SafeAreaProvider>
  );
};

export default ProfileScreen;
