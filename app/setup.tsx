import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import * as Localization from 'expo-localization';

import { NavigationProps } from '@/types/navigation';
import { APP_NAME, LANGUAGES, SUPPORTED_LANGUAGES } from '@/constants/common';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import stateStore from '@/state/store';
import { getSetupStyles } from '@/styles/setup';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/settings/themeToggle';
import DropdownSelector from '@/components/settings/dropdown';

// TODO - refactor continue button into reusable component

const locales = Localization.getLocales();
const locale = locales[0]?.languageCode;

const SetupScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const userSettings = stateStore((s) => s.userSettings);
  const { t } = useTranslation('setup');
  const { theme } = useTheme();
  const styles = useMemo(() => getSetupStyles(theme), [theme]);
  const [language, setLanguage] = useState<string>(
    locale && SUPPORTED_LANGUAGES.includes(locale) ? locale : 'en'
  );
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    userSettings.isDarkTheme
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    persistUserSettings({ ...userSettings, isDarkTheme });
  }, [isDarkTheme]);

  const ageRanges = [
    { label: t('underAge'), value: '12' },
    { label: '13-15', value: '13-15' },
    { label: '16-17', value: '16-17' },
    { label: '18+', value: '18' },
    { label: t('preferNotToSay'), value: '0' },
  ];

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{APP_NAME}</Text>
        </View>

        <DropdownSelector
          value={language}
          setValue={setLanguage}
          data={LANGUAGES}
          text={{
            namespace: 'setup',
            label: 'language',
            placeholder: 'selectLanguage',
          }}
        />

        <DropdownSelector
          value={ageRange}
          setValue={setAgeRange}
          data={ageRanges}
          text={{
            namespace: 'setup',
            label: 'ageRange',
            labelSubtext: 'optional',
            helperText: 'adHelpText',
            placeholder: 'selectAgeRange',
          }}
        />

        <ThemeToggle
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
        />

        <Pressable
          onPress={() => {
            persistUserSettings({
              ...userSettings,
              isSetUp: true,
              locale: language,
              isDarkTheme,
            });
            navigation.navigate('home');
          }}
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
    </SafeAreaView>
  );
};

export default SetupScreen;
