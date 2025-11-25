import { useEffect, useMemo } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { NavigationProps } from '@/types/navigation';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_TEST_ID } from '@/constants/adId';
import { getPassportEntryStyles } from '@/styles/passportEntry';

const PassportEntryScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('passport');
  const { theme } = useTheme();
  const styles = useMemo(() => getPassportEntryStyles(theme), [theme]);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;

  useEffect(() => {
    navigation.setOptions({ title: t('title') });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaView>
  );
};

export default PassportEntryScreen;
