import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
} from 'react-native';
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
  const [year, setYear] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    userSettings.isDarkTheme
  );

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

  const isContinueDisabled = userSettings.isPremiumUser ? false : !isValidYear;

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
          onPress={() => {
            persistUserSettings({
              ...userSettings,
              isSetUp: true,
              userAgeForPersonalisation: handleContinueAgeCalculation(),
              locale: language,
              isDarkTheme,
            });
            navigation.navigate('home');
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
    </SafeAreaView>
  );
};

export default SetupScreen;
