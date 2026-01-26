import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import {
  BackHandler,
  PixelRatio,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import stateStore from '@/state/store';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import resetToDifficultyScreen from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import { ACCURACY_ID, MATCHES_PLAYED_ID } from '@/constants/leaderboard';
import PlayGames from '@/PlayGames';
import { useTheme } from '@/context/ThemeContext';
import { BANNER_TEST_ID } from '@/constants/adId';
import AdBanner from '@/components/AdBanner/AdBanner';
import calculateLeaderboardScore from '@/util/calculateLeaderboardScore/calculateLeaderboardScore';
import chunkArray from '@/util/chunkArray/chunkArray';
import SummaryHistory from '@/components/summary/summaryHistory';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import { getSummarySharedStyles } from '@/styles/summary/summaryShared';
import { getPracticeSummaryStyles } from '@/styles/summary/practiceSummary';
import calculateExperienceGain from '@/util/leveling/calculateExperienceGain';
import calculateUserLevelData from '@/util/leveling/calculateUserLevelData';
import persistUserSettings from '@/util/persistState/persistUserSettings';

type PassportProgression = {
  countryName: string;
  previousPercentage: number;
  newPercentage: number;
};

const PracticeSummary = () => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<RootStackParamList, 'practiceSummary'>>();
  const { t } = useTranslation('practiceSummary');
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const fontScale = PixelRatio.getFontScale();
  const styles = getPracticeSummaryStyles();
  const sharedSummaryStyles = useMemo(
    () => getSummarySharedStyles(theme),
    [theme]
  );
  const userProgression = stateStore((s) => s.userProgress);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const { isPremiumUser, userLevel } = userSettings;
  const { passportBeforeQuiz, gameResult } = route.params;
  const { correct, incorrect, history } = gameResult;
  const showAds = !isPremiumUser && isInternetAvailable;
  const initialProgressionRef = useRef(userProgression);
  const initialUserLevelRef = useRef(userLevel);
  const rows = chunkArray(history, 10);

  const experienceGained = calculateExperienceGain({
    correct: correct,
  });

  const newUserLevelData = calculateUserLevelData({
    userLevel: initialUserLevelRef.current,
    experienceGained,
  });

  useEffect(() => {
    navigation.setOptions({ title: t('summary') });
  }, [navigation]);

  useEffect(() => {
    const newMatchesPlayed =
      initialProgressionRef.current.games.matchesPlayed + 1;
    const totalCorrect = initialProgressionRef.current.games.totalCorrect;
    const totalIncorrect = initialProgressionRef.current.games.totalIncorrect;

    persistUserSettings({ ...userSettings, userLevel: newUserLevelData });
    PlayGames.submitScore(MATCHES_PLAYED_ID, newMatchesPlayed);
    PlayGames.submitScore(
      ACCURACY_ID,
      calculateLeaderboardScore(totalCorrect, totalCorrect + totalIncorrect)
    );
  }, [navigation]);

  const handleContinue = () =>
    resetToDifficultyScreen(navigation, 'difficulty');

  const orderedPassportBeforeQuiz = passportBeforeQuiz.sort((a, b) =>
    a.countryCode.localeCompare(b.countryCode)
  );

  const beforeCodes = new Set(
    passportBeforeQuiz.map((entry) => entry.countryCode)
  );

  const orderedPassportAfterQuiz = userProgression.passport
    .filter((entry) => beforeCodes.has(entry.countryCode))
    .sort((a, b) => a.countryCode.localeCompare(b.countryCode));

  const passportProgression: PassportProgression[] =
    orderedPassportBeforeQuiz.map((before, index) => {
      const after = orderedPassportAfterQuiz[index];

      return {
        countryName: t(`countries.${toJsonKeyFormat(before.countryName)}`, {
          ns: 'data',
        }),
        previousPercentage: Math.round(
          (before.correctTotal /
            (before.correctTotal + before.incorrectTotal)) *
            100
        ),
        newPercentage:
          (after!.correctTotal /
            (after!.correctTotal + after!.incorrectTotal)) *
          100,
      };
    });

  const improvedCount = passportProgression.filter(
    (entry) => entry.newPercentage > entry.previousPercentage
  ).length;

  const getSubtitle = () => {
    if (improvedCount === 1) return t('improvedSingular');
    if (improvedCount > 1)
      return t('improvedPlural', { number: improvedCount });
    return t('improvedNone');
  };

  return (
    <SafeAreaProvider
      style={{
        ...sharedSummaryStyles.rootContainer,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView>
        <View style={sharedSummaryStyles.sectionContainer}>
          <Text style={sharedSummaryStyles.title}>{t('completed')}</Text>

          <Text style={sharedSummaryStyles.subtitleText}>{getSubtitle()}</Text>
          <View style={styles.comparisonContainer}>
            {passportProgression
              .sort((a, b) => b.newPercentage - a.newPercentage)
              .map((entry, index) => {
                const renderSingleColumn =
                  (width < 400 && fontScale > 1.1) ||
                  (width < 500 && fontScale >= 1.8) ||
                  (width < 450 && fontScale >= 1.5);

                const getMargin = () => {
                  const columns = renderSingleColumn ? 1 : 2;

                  const itemsInLastRow =
                    passportProgression.length % columns || columns;

                  const lastRowStartIndex =
                    passportProgression.length - itemsInLastRow;

                  return index < lastRowStartIndex ? 10 : 0;
                };

                const getComparisonColor = (
                  value: number,
                  otherValue: number
                ) => {
                  if (value === otherValue) return 'white';
                  return value > otherValue ? 'green' : 'red';
                };

                const formatPercent = (num: number) => {
                  return Number(num.toFixed(1)).toString();
                };

                return (
                  <View
                    style={{
                      ...styles.comparisonItemContainer,
                      width: renderSingleColumn ? '100%' : '50%',
                      marginBottom: getMargin(),
                    }}
                    key={index}
                  >
                    <Text style={sharedSummaryStyles.subtitleText}>
                      {entry.countryName}
                    </Text>
                    {entry.newPercentage === entry.previousPercentage ? (
                      <Text
                        style={{
                          ...sharedSummaryStyles.valueText,
                          color: getComparisonColor(
                            entry.newPercentage,
                            entry.previousPercentage
                          ),
                        }}
                      >
                        {t('percentage', {
                          number: formatPercent(entry.newPercentage),
                        })}
                      </Text>
                    ) : (
                      <View style={styles.comparisonNumericContainer}>
                        <Text style={sharedSummaryStyles.valueText}>
                          {t('percentage', {
                            number: formatPercent(entry.previousPercentage),
                          })}
                        </Text>
                        <Feather
                          name={'arrow-right'}
                          size={24}
                          color={theme.text}
                        />
                        <Text
                          style={{
                            ...sharedSummaryStyles.valueText,
                            color: getComparisonColor(
                              entry.newPercentage,
                              entry.previousPercentage
                            ),
                          }}
                        >
                          {t('percentage', {
                            number: formatPercent(entry.newPercentage),
                          })}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
          </View>

          {history.length > 0 && (
            <SummaryHistory
              rows={rows}
              correct={correct}
              incorrect={incorrect}
            />
          )}
        </View>

        <View style={sharedSummaryStyles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              sharedSummaryStyles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handleContinue}
            accessibilityLabel={t('continue')}
            accessibilityRole="button"
          >
            <Text style={sharedSummaryStyles.buttonText}>{t('continue')}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaProvider>
  );
};

export default PracticeSummary;
