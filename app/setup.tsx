import { useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import * as Localization from 'expo-localization';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { APP_NAME, LANGUAGES, SUPPORTED_LANGUAGES } from '@/constants/common';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import stateStore from '@/state/store';
import { getSetupStyles } from '@/styles/setup';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/settings/themeToggle';
import DropdownSelector from '@/components/settings/dropdown';

// TODO - refactor continue button into reusable component
// TODO - add profanity filter to username

const locales = Localization.getLocales();
const locale = locales[0]?.languageCode;

const SetupScreen = () => {
  const userSettings = stateStore((s) => s.userSettings);
  const userDefaultPlatformName = stateStore((s) => s.userDefaultPlatformName);
  const { t } = useTranslation('setup');
  const { theme } = useTheme();
  const styles = useMemo(() => getSetupStyles(theme), [theme]);
  const [language, setLanguage] = useState<string>(
    locale && SUPPORTED_LANGUAGES.includes(locale) ? locale : 'en'
  );
  const [displayName, setDisplayName] = useState<string>(
    userDefaultPlatformName
  );
  const [year, setYear] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    userSettings.isDarkTheme
  );

  useEffect(() => {
    setDisplayName(userDefaultPlatformName);
  }, [userDefaultPlatformName]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    persistUserSettings({ ...userSettings, isDarkTheme });
  }, [isDarkTheme]);

  const isValidYear =
    year.length === 4 &&
    parseInt(year) > 1900 &&
    parseInt(year) <= new Date().getFullYear();

  const handleContinueAgeCalculation = () =>
    new Date().getFullYear() - parseInt(year);

  const isContinueDisabled =
    displayName && userSettings.isPremiumUser ? false : !isValidYear;

  return (
    <SafeAreaProvider style={styles.rootContainer}>
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

        <View style={{ gap: 10 }}>
          <Text style={styles.header}>{t('displayName')}</Text>
          <TextInput
            style={styles.textBox}
            inputMode="text"
            keyboardType="default"
            returnKeyType="done"
            accessibilityLabel={t('displayNameAccessibilityLabel')}
            maxLength={16}
            value={displayName}
            onChangeText={(text: string) => setDisplayName(text)}
          />
        </View>

        {!userSettings.isPremiumUser && (
          <View style={{ gap: 10 }}>
            <Text style={styles.header}>{t('yearOfBirth')}</Text>
            <TextInput
              style={styles.textBox}
              inputMode="numeric"
              placeholderTextColor={theme.text}
              placeholder="YYYY"
              keyboardType="number-pad"
              returnKeyType="done"
              accessibilityLabel={t('yearOfBirthAccessibilityLabel')}
              accessibilityHint={t('yearOfBirthAccessibilityHint')}
              maxLength={4}
              value={year}
              onChangeText={(text: string) => {
                const numericText = text.replace(/[^0-9]/g, '');
                setYear(numericText);
              }}
            />
          </View>
        )}

        <ThemeToggle
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
        />

        <Pressable
          onPress={async () => {
            await persistUserSettings({
              ...userSettings,
              userDisplayName: displayName,
              isSetUp: true,
              userAgeForPersonalisation: handleContinueAgeCalculation(),
              locale: language,
              isDarkTheme,
            });
            router.replace('/(tabs)');
          }}
          disabled={isContinueDisabled}
          style={({ pressed }) => [
            isContinueDisabled ? styles.buttonDisabled : styles.buttonEnabled,
            { opacity: pressed ? 0.7 : isContinueDisabled ? 0.5 : 1 },
          ]}
          accessibilityLabel={t('continue')}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{t('continue')}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default SetupScreen;
