import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import { Dropdown } from 'react-native-element-dropdown';
import * as Localization from 'expo-localization';
import { Switch } from 'react-native-paper';

import { colors } from '@/components/colors';
import { NavigationProps } from '@/types/navigation';
import { APP_NAME, LANGUAGES, SUPPORTED_LANGUAGES } from '@/constants/common';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import stateStore from '@/state/store';
import { getSetupStyles } from '@/styles/setup';
import { useTheme } from '@/context/ThemeContext';

const locales = Localization.getLocales();
const locale = locales[0]?.languageCode;

const SetupScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const userSettings = stateStore((s) => s.userSettings);
  const { setUserSettings } = stateStore.getState();
  const { t } = useTranslation('setup');
  const { theme } = useTheme();
  const styles = useMemo(() => getSetupStyles(theme), [theme]);
  const [language, setLanguage] = useState<string>(
    locale && SUPPORTED_LANGUAGES.includes(locale) ? locale : 'en'
  );
  const [ageRange, setAgeRange] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    userSettings.isDarkTheme
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    setUserSettings({ ...userSettings, isDarkTheme });
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

        <View style={styles.dropdownSection}>
          <Text style={styles.label}>
            {t('ageRange')}{' '}
            <Text style={styles.optional}>({t('optional')})</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            data={ageRanges}
            labelField="label"
            valueField="value"
            value={ageRange}
            placeholder={t('selectAgeRange')}
            placeholderStyle={{ color: theme.text }}
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
            onChange={(item) => setAgeRange(item.value)}
          />
          <Text style={styles.helperText}>{t('adHelpText')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t('darkTheme')}</Text>
          <Switch
            color={colors.blueSecondary}
            value={userSettings.isDarkTheme}
            onValueChange={() => setIsDarkTheme(!isDarkTheme)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            persistUserSettings({
              ...userSettings,
              isSetUp: true,
              locale: language,
              isDarkTheme,
            });
            navigation.navigate('home');
          }}
          style={styles.button}
          activeOpacity={0.8}
          accessibilityLabel={t('continue')}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{t('continue')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetupScreen;
