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
import { Feather } from '@expo/vector-icons';

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
import persistProgression from '@/util/persistState/persistProgression';
import { defaultProgressionStructure } from '@/state/secureStoreStructure';

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const userProgress = stateStore((s) => s.userProgress);
  const { t } = useTranslation('settings');
  const [hasResetProgress, setHasResetProgress] = useState<boolean>(false);
  const [isResetAccordionOpen, setIsResetAccordionOpen] =
    useState<boolean>(false);
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

  useEffect(() => {
    if (hasResetProgress) {
      setTimeout(() => {
        setHasResetProgress(false);
        setIsResetAccordionOpen(false);
      }, 3000);
    }
  }, [hasResetProgress]);

  const ThemeToggle = () => (
    <View style={styles.sectionRow}>
      <Text style={styles.label}>{t('darkTheme')}</Text>
      <Switch
        color={colors.blueSecondary}
        value={userSettings.isDarkTheme}
        onValueChange={() => setIsDarkTheme(!isDarkTheme)}
      />
    </View>
  );

  const ResetProgress = () => (
    <Pressable
      onPress={() => setIsResetAccordionOpen(!isResetAccordionOpen)}
      style={({ pressed }) => [
        styles.resetProgressContainer,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.resetProgressTitleContainer}>
        <Text style={styles.label}>{t('resetProgress')} </Text>
        <Feather
          name={isResetAccordionOpen ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.text}
        />
      </View>
      {isResetAccordionOpen && (
        <>
          <Text
            style={{
              fontFamily: 'DMSansBold',
              color: hasResetProgress ? theme.correct : theme.incorrect,
              fontSize: 14,
            }}
          >
            {hasResetProgress ? t('resetSuccess') : t('resetWarning')}
          </Text>
          <Text style={styles.text}>{t('holdToResetText')}</Text>
          <Pressable
            onLongPress={() => {
              persistProgression({
                ...defaultProgressionStructure,
                games: {
                  ...defaultProgressionStructure.games,
                  matchesPlayed: userProgress.games.matchesPlayed,
                  totalCorrect: userProgress.games.totalCorrect,
                  totalIncorrect: userProgress.games.totalIncorrect,
                },
              });
              setHasResetProgress(true);
            }}
            delayLongPress={5000}
            style={({ pressed }) => [
              styles.button,
              {
                opacity: pressed ? 0.7 : 1,
                backgroundColor: hasResetProgress
                  ? theme.correct
                  : theme.button,
              },
            ]}
            accessibilityLabel={t('continue')}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>
              {hasResetProgress ? t('resetSuccessButton') : t('holdToReset')}
            </Text>
          </Pressable>
        </>
      )}
    </Pressable>
  );

  const PrivacyPolicy = () => (
    <Pressable
      onPress={() => Linking.openURL('https://sites.google.com/view/flaggr')}
      style={({ pressed }) => [
        styles.sectionRow,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text style={styles.privacyPolicyText}>{t('privacy')}</Text>
    </Pressable>
  );

  const ContinueButton = () => (
    <Pressable
      onPress={() => navigation.navigate('home')}
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
      accessibilityLabel={t('continue')}
      accessibilityRole="button"
    >
      <Text style={styles.buttonText}>{t('continue')}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <PurchasePremiumButton />
        <View>
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
        <ThemeToggle />
        <ResetProgress />
        <PrivacyPolicy />
        <ContinueButton />
      </ScrollView>

      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaView>
  );
};

export default SettingsScreen;
