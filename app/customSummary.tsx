import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { BackHandler, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import stateStore from '@/state/store';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import persistProgression from '@/util/persistState/persistProgression';
import resetToDifficultyScreen from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import formatTime from '@/util/formatTime/formatTime';
import setBestGameData from '@/util/updatedProgressionStructure/setBestGameData';
import { ProgressionStructure } from '@/types/secureStore';
import {
  ACCURACY_ID,
  HIGH_SCORE_ID,
  MATCHES_PLAYED_ID,
} from '@/constants/leaderboard';
import PlayGames from '@/PlayGames';
import { useTheme } from '@/context/ThemeContext';
import { getCustomSummaryStyles } from '@/styles/summary/customSummary';
import { BANNER_TEST_ID } from '@/constants/adId';
import AdBanner from '@/components/AdBanner/AdBanner';
import calculateLeaderboardScore from '@/util/calculateLeaderboardScore/calculateLeaderboardScore';
import chunkArray from '@/util/chunkArray/chunkArray';
import SummaryHistory from '@/components/summary/summaryHistory';
import { getSummarySharedStyles } from '@/styles/summary/summaryShared';
import calculateExperienceGain from '@/util/leveling/calculateExperienceGain';
import calculateUserLevelData from '@/util/leveling/calculateUserLevelData';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import AnimatedXpProgressBar from '@/components/animatedXpProgressBar/animatedXpProgressBar';

const CustomSummary = () => {
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
  const route = useRoute<RouteProp<RootStackParamList, 'customSummary'>>();
  const { t } = useTranslation('customSummary');
  const { theme } = useTheme();
  const styles = getCustomSummaryStyles();
  const sharedSummaryStyles = useMemo(
    () => getSummarySharedStyles(theme),
    [theme]
  );
  const userProgression = stateStore((s) => s.userProgress);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const { isPremiumUser, userLevel } = userSettings;
  const { gameResult, finalScore } = route.params;
  const { correct, incorrect, highestStreak, history, timeTaken } = gameResult;
  const { regions, independentCountriesOnly, timeLimit, gameLength } =
    userProgression.games.custom.currentGame;

  const showAds = !isPremiumUser && isInternetAvailable;

  const initialProgressionRef = useRef(userProgression);
  const initialUserLevelRef = useRef(userLevel);
  const progression = initialProgressionRef.current.games.custom;

  const isNewHighScore = useMemo(
    () => finalScore > progression.bestGame.score,
    [progression.bestGame.score, finalScore]
  );

  const newHighScoreMessage = isNewHighScore ? t('newHighScore') : null;

  const [historyItemsToShow, setHistoryItemsToShow] = useState<number>(40);
  const rows = chunkArray(history.slice(0, historyItemsToShow), 10);

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
    let updatedProgression: ProgressionStructure =
      initialProgressionRef.current;

    const newMatchesPlayed =
      initialProgressionRef.current.games.matchesPlayed + 1;
    const totalCorrect = initialProgressionRef.current.games.totalCorrect;
    const totalIncorrect = initialProgressionRef.current.games.totalIncorrect;

    if (isNewHighScore) {
      updatedProgression = setBestGameData(initialProgressionRef.current, {
        score: finalScore,
        regions,
        independentCountriesOnly,
        timeLimit,
        gameLength,
        correct,
        incorrect,
        streak: highestStreak,
      });
    }

    persistProgression({
      games: { ...updatedProgression.games, matchesPlayed: newMatchesPlayed },
      passport: updatedProgression.passport,
    });
    persistUserSettings({ ...userSettings, userLevel: newUserLevelData });

    PlayGames.submitScore(MATCHES_PLAYED_ID, newMatchesPlayed);
    PlayGames.submitScore(HIGH_SCORE_ID, finalScore);
    PlayGames.submitScore(
      ACCURACY_ID,
      calculateLeaderboardScore(totalCorrect, totalCorrect + totalIncorrect)
    );
  }, [navigation, gameResult, finalScore]);

  const handleContinue = () => resetToDifficultyScreen(navigation, 'custom');

  return (
    <SafeAreaProvider style={sharedSummaryStyles.rootContainer}>
      <ScrollView>
        <View style={sharedSummaryStyles.sectionContainer}>
          <Text style={sharedSummaryStyles.title}>{t('completed')}</Text>

          <View style={sharedSummaryStyles.gameResultScoreContainer}>
            <Text style={sharedSummaryStyles.scoreTitleText}>
              {newHighScoreMessage ? newHighScoreMessage : t('score')}
            </Text>
            <Text style={sharedSummaryStyles.scoreValueText}>{finalScore}</Text>
          </View>

          <View style={sharedSummaryStyles.gameResultAdvancedContainer}>
            <View style={sharedSummaryStyles.gameResultAdvancedItem}>
              <Text style={sharedSummaryStyles.subtitleText}>
                {t('correct')}
              </Text>
              <Text style={sharedSummaryStyles.valueText}>{correct}</Text>
            </View>
            <View style={sharedSummaryStyles.gameResultAdvancedItem}>
              <Text style={sharedSummaryStyles.subtitleText}>
                {t('incorrect')}
              </Text>
              <Text style={sharedSummaryStyles.valueText}>{incorrect}</Text>
            </View>
          </View>
          <View style={sharedSummaryStyles.gameResultAdvancedContainer}>
            <View style={sharedSummaryStyles.gameResultAdvancedItem}>
              <Text style={sharedSummaryStyles.subtitleText}>
                {t('streak')}
              </Text>
              <Text style={sharedSummaryStyles.valueText}>{highestStreak}</Text>
            </View>
            <View style={sharedSummaryStyles.gameResultAdvancedItem}>
              <Text style={sharedSummaryStyles.subtitleText}>{t('time')}</Text>
              <Text style={sharedSummaryStyles.valueText}>
                {timeTaken ? formatTime(timeTaken, false) : 'Unlimited'}
              </Text>
            </View>
          </View>

          {history.length > 0 && (
            <View style={styles.historySectionContainer}>
              <SummaryHistory
                rows={rows}
                correct={correct}
                incorrect={incorrect}
              />
              {historyItemsToShow < history.length && (
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  onPress={() => setHistoryItemsToShow(history.length)}
                  accessible={false}
                >
                  <Text style={sharedSummaryStyles.buttonText}>
                    {t('showAll')}
                  </Text>
                </Pressable>
              )}
            </View>
          )}

          <AnimatedXpProgressBar
            initialUserLevelData={initialUserLevelRef.current}
            newUserLevelData={newUserLevelData}
            experienceGained={experienceGained}
          />
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

export default CustomSummary;
