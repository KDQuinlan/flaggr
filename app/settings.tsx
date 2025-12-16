import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import { Feather } from '@expo/vector-icons';
import { AdsConsent } from 'react-native-google-mobile-ads';

import { colors } from '@/components/colors';
import { NavigationProps } from '@/types/navigation';
import { LANGUAGES } from '@/constants/common';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import stateStore from '@/state/store';
import PurchasePremiumButton from '@/components/PurchasePremiumButton/PurchasePremiumButton';
import { useTheme } from '@/context/ThemeContext';
import { getSettingsStyles } from '@/styles/settings';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_HOME_AND_SETTINGS_ID, BANNER_TEST_ID } from '@/constants/adId';
import persistProgression from '@/util/persistState/persistProgression';
import { defaultProgressionStructure } from '@/state/secureStoreStructure';
import Slider from '@react-native-community/slider';
import {
  ANSWERS_SHOWN_DURATION_INFINTE,
  ANSWERS_SHOWN_DURATION_MAXIMUM_MS,
  ANSWERS_SHOWN_DURATION_STEP,
} from '@/constants/settings';
import ThemeToggle from '@/components/settings/themeToggle';
import DropdownSelector from '@/components/settings/dropdown';
import { UserAgesForPersonalisation } from '@/types/secureStore';

interface IAnswersShownDurationSliderProps {
  value: number;
  onValueChange: (answerShownDuration: number) => void;
}

const AnswersShownDurationSlider = React.memo(
  ({ value, onValueChange }: IAnswersShownDurationSliderProps) => {
    const { t } = useTranslation('settings');
    const { theme } = useTheme();
    const styles = useMemo(() => getSettingsStyles(theme), [theme]);
    const userSettings = stateStore((s) => s.userSettings);

    useEffect(() => {
      if (value !== userSettings.displayAnswerTimerMs) {
        const timeout = setTimeout(() => {
          persistUserSettings({
            ...userSettings,
            displayAnswerTimerMs: value,
          });
        }, 300);

        return () => clearTimeout(timeout);
      }
    }, [value]);

    const sliderValueToShow = () => {
      const valueToS = value / 1000;

      if (valueToS === 0) return t('unlimited');
      if (valueToS === 1) return t('secondsSingular');
      return t('secondsPlural', { value: valueToS });
    };

    return (
      <View style={{ gap: 10 }}>
        <Text style={styles.label}>{t('answersShownDuration')}</Text>
        <View>
          <Text style={styles.sliderTitle}>{sliderValueToShow()}</Text>
          <Slider
            value={value}
            onValueChange={onValueChange}
            minimumValue={ANSWERS_SHOWN_DURATION_INFINTE}
            maximumValue={ANSWERS_SHOWN_DURATION_MAXIMUM_MS}
            step={ANSWERS_SHOWN_DURATION_STEP}
            minimumTrackTintColor={colors.blueSecondary}
            maximumTrackTintColor={theme.text}
            thumbTintColor={colors.blueSecondary}
          />

          <View style={styles.sliderValuesContainer}>
            <Text style={styles.text}>{t('unlimited')}</Text>
            <Text style={styles.text}>
              {ANSWERS_SHOWN_DURATION_MAXIMUM_MS / 1000}
            </Text>
          </View>
        </View>
      </View>
    );
  }
);

interface IResetProgressProps {
  isResetAccordionOpen: boolean;
  setIsResetAccordionOpen: (isResetAccordionOpen: boolean) => void;
  hasResetProgress: boolean;
  setHasResetProgress: (hasResetProgress: boolean) => void;
}

const ResetProgress = React.memo(
  ({
    isResetAccordionOpen,
    setIsResetAccordionOpen,
    hasResetProgress,
    setHasResetProgress,
  }: IResetProgressProps) => {
    const { t } = useTranslation('settings');
    const { theme } = useTheme();
    const styles = useMemo(() => getSettingsStyles(theme), [theme]);
    const userProgress = stateStore((s) => s.userProgress);

    return (
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
  }
);

const PrivacyPolicy = () => {
  const { t } = useTranslation('settings');
  const { theme } = useTheme();
  const styles = useMemo(() => getSettingsStyles(theme), [theme]);

  return (
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
};

const PrivacyConsent = () => {
  const { t } = useTranslation('settings');
  const { theme } = useTheme();
  const styles = useMemo(() => getSettingsStyles(theme), [theme]);

  const openPrivacySettings = async () => {
    try {
      await AdsConsent.showPrivacyOptionsForm();
    } catch {
      Alert.alert(t('unavailable'), t('unavailableReason'));
    }
  };

  return (
    <Pressable
      onPress={() => openPrivacySettings()}
      style={({ pressed }) => [
        styles.sectionRow,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text style={styles.privacyPolicyText}>{t('managePrivacySettings')}</Text>
    </Pressable>
  );
};

const ContinueButton = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('settings');
  const { theme } = useTheme();
  const styles = useMemo(() => getSettingsStyles(theme), [theme]);

  return (
    <Pressable
      onPress={() => navigation.navigate('home')}
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
      accessibilityLabel={t('continue')}
      accessibilityRole="button"
    >
      <Text style={styles.buttonText}>{t('continue')}</Text>
    </Pressable>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
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
  const [answerShownDuration, setAnswerShownDuration] = useState<number>(
    userSettings.displayAnswerTimerMs
  );
  const [ageRange, setAgeRange] = useState<UserAgesForPersonalisation | null>(
    userSettings.userAgeForPersonalisation
  );
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;
  const isUserAMinor = userSettings.userAgeForPersonalisation !== 18;

  const ageRanges = [
    { label: t('underThirteen', { ns: 'setup' }), value: 12 },
    { label: '13-15', value: 13 },
    { label: '16-17', value: 16 },
    { label: '18+', value: 18 },
    { label: t('preferNotToSay', { ns: 'setup' }), value: 0 },
  ];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (
      isDarkTheme !== userSettings.isDarkTheme ||
      ageRange !== userSettings.userAgeForPersonalisation ||
      language !== userSettings.locale
    ) {
      persistUserSettings({
        ...userSettings,
        userAgeForPersonalisation: ageRange,
        locale: language,
        isDarkTheme,
      });
    }
  }, [language, isDarkTheme, ageRange]);

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

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {!userSettings.isPremiumUser && <PurchasePremiumButton />}
        <DropdownSelector
          value={language}
          setValue={setLanguage}
          data={LANGUAGES}
          text={{
            namespace: 'settings',
            label: 'language',
          }}
        />
        {!userSettings.isPremiumUser && (
          <DropdownSelector
            value={ageRange}
            setValue={setAgeRange}
            data={ageRanges}
            text={{
              namespace: 'setup',
              label: 'ageRange',
              helperText: 'adHelpText',
            }}
          />
        )}
        <ThemeToggle
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
        />
        <AnswersShownDurationSlider
          value={answerShownDuration}
          onValueChange={setAnswerShownDuration}
        />
        <ResetProgress
          isResetAccordionOpen={isResetAccordionOpen}
          setIsResetAccordionOpen={setIsResetAccordionOpen}
          hasResetProgress={hasResetProgress}
          setHasResetProgress={setHasResetProgress}
        />
        <PrivacyPolicy />
        {!isUserAMinor && !userSettings.isPremiumUser && <PrivacyConsent />}
        <ContinueButton />
      </ScrollView>

      {showAds && (
        <AdBanner
          adId={__DEV__ ? BANNER_TEST_ID : BANNER_HOME_AND_SETTINGS_ID}
        />
      )}
    </SafeAreaView>
  );
};

export default SettingsScreen;
