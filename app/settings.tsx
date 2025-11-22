import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import { Dropdown } from 'react-native-element-dropdown';
import { Switch } from 'react-native-paper';

import { colors } from '@/components/colors';
import { NavigationProps } from '@/types/navigation';
import { LANGUAGES } from '@/constants/common';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import stateStore from '@/state/store';
import PurchasePremiumButton from '@/components/PurchasePremiumButton/PurchasePremiumButton';
import { useTheme } from '@/context/ThemeContext';
import { getSettingsStyles } from '@/styles/settings';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_TEST_ID } from '@/constants/adId';

// TODO - remove on render state update?

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const { t } = useTranslation('settings');
  const [language, setLanguage] = useState<string>(userSettings.locale);
  const { theme } = useTheme();
  const styles = useMemo(() => getSettingsStyles(theme), [theme]);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    userSettings.isDarkTheme
  );

  const showAds = !userSettings.isPremiumUser && isInternetAvailable;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    persistUserSettings({
      ...userSettings,
      locale: language,
      isDarkTheme,
    });
  }, [language, isDarkTheme]);

  useEffect(() => {
    navigation.setOptions({
      title: t('title'),
    });
  }, [navigation, language]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <PurchasePremiumButton />
        <View style={styles.dropdownSection}>
          <Text style={styles.label}>{t('language')}</Text>
          <Dropdown
            style={styles.dropdown}
            data={LANGUAGES}
            labelField="label"
            valueField="value"
            value={language}
            placeholder={t('selectLanguage')}
            selectedTextStyle={{ color: theme.text }}
            itemTextStyle={{ color: theme.text }}
            containerStyle={{
              backgroundColor: theme.card,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.accent,
            }}
            itemContainerStyle={{
              backgroundColor: theme.card,
              borderRadius: 8,
            }}
            activeColor={theme.accent}
            onChange={(item) => setLanguage(item.value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t('darkTheme')}</Text>
          <Switch
            color={colors.blueSecondary}
            value={userSettings.isDarkTheme}
            onValueChange={() => setIsDarkTheme(!isDarkTheme)}
          />
        </View>

        <Pressable
          onPress={() =>
            Linking.openURL('https://sites.google.com/view/flaggr')
          }
          style={({ pressed }) => [
            styles.section,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={styles.privacyPolicyText}>{t('privacy')}</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('home')}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel={t('continue')}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{t('continue')}</Text>
        </Pressable>
      </ScrollView>

      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaView>
  );
};

export default SettingsScreen;
