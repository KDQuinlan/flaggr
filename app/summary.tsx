import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ScrollView, Text, View, BackHandler, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import iconsMap from '@/assets/images/icons';
import { LEVEL_MAP } from '@/constants/mappers';
import { TO_PERCENTAGE_MULTIPLIER } from '@/constants/common';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import stateStore from '@/state/store';
import createUpdatedProgressionStructure from '@/util/updatedProgressionStructure/createdUpdatedProgressionStructure';
import formatTime from '@/util/formatTime/formatTime';
import getNextLevelKey from '@/util/getNextLevelKey/getNextLevelKey';
import persistProgression from '@/util/persistState/persistProgression';
import resetToDifficultyScreen from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import { ProgressionStructure } from '@/types/secureStore';
import { ACCURACY_ID, MATCHES_PLAYED_ID } from '@/constants/leaderboard';
import PlayGames from '@/PlayGames';
import determineSummaryIcons from '@/util/determineSummaryIcons';
import { getSummaryStyles } from '@/styles/summary/summary';
import { useTheme } from '@/context/ThemeContext';
import { BANNER_TEST_ID } from '@/constants/adId';
import AdBanner from '@/components/AdBanner/AdBanner';
import calculateLeaderboardScore from '@/util/calculateLeaderboardScore/calculateLeaderboardScore';
import chunkArray from '@/util/chunkArray/chunkArray';
import SummaryHistory from '@/components/summary/summaryHistory';
import { getSummarySharedStyles } from '@/styles/summary/summaryShared';

const Summary = () => {
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
  const route = useRoute<RouteProp<RootStackParamList, 'summary'>>();
  const { t } = useTranslation('summary');
  const { theme } = useTheme();
  const styles = getSummaryStyles();
  const sharedSummaryStyles = useMemo(
    () => getSummarySharedStyles(theme),
    [theme]
  );
  const userProgression = stateStore((s) => s.userProgress);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const { isPremiumUser } = stateStore((s) => s.userSettings);
  const { difficulty, gameMode, gameResult } = route.params;
  const { correct, incorrect, highestStreak, history, timeTaken } = gameResult;
  const numberSuffix = gameMode === 'rapid' ? '' : '%';
  const translatedDifficulty = t(`levels.${LEVEL_MAP[difficulty]}`, {
    ns: 'data',
  });

  const showAds = !isPremiumUser && isInternetAvailable;

  const initialProgressionRef = useRef(userProgression);

  const resultPercentage = useMemo(() => {
    if (gameMode !== 'standard') return correct;
    return correct + incorrect > 0
      ? (correct / (correct + incorrect)) * TO_PERCENTAGE_MULTIPLIER
      : 0;
  }, [correct, incorrect, gameMode]);

  const progression =
    initialProgressionRef.current.games[gameMode][LEVEL_MAP[difficulty]];

  const isAdvancementRequirementMet = useMemo(
    () => resultPercentage >= progression.advancementRequirement,
    [resultPercentage, progression.advancementRequirement]
  );

  const userNextLevel = getNextLevelKey(
    gameMode,
    progression.id,
    initialProgressionRef.current
  );

  const userNextLevelProgression =
    userNextLevel &&
    initialProgressionRef.current.games[gameMode][LEVEL_MAP[userNextLevel]];

  const initialIsNextLevelLocked = useMemo(
    () =>
      userNextLevel
        ? initialProgressionRef.current.games[gameMode][
            LEVEL_MAP[userNextLevel]
          ].isLocked
        : false,
    [gameMode, userNextLevel]
  );

  const isNewHighScore = useMemo(
    () => resultPercentage > progression.userScore,
    [progression.isCompleted, progression.userScore, resultPercentage]
  );

  const unlockedMessage =
    initialIsNextLevelLocked && isAdvancementRequirementMet && userNextLevel
      ? t('unlockMessage', {
          userNextLevel: t(`levels.${LEVEL_MAP[userNextLevel]}`, {
            ns: 'data',
          }),
        })
      : null;

  const newHighScoreMessage = isNewHighScore ? t('newHighScore') : null;

  const unlockRequirementMessage =
    userNextLevelProgression &&
    userNextLevelProgression.isLocked &&
    !isAdvancementRequirementMet
      ? t('unlockRequirementMessage', {
          userNextLevel: t(`levels.${LEVEL_MAP[userNextLevel]}`, {
            ns: 'data',
          }),
          advancementRequirement:
            userNextLevelProgression.advancementRequirement,
          numberSuffix: numberSuffix,
        })
      : null;

  const rows = chunkArray(history, 10);

  useEffect(() => {
    navigation.setOptions({
      title: t('summary', { difficulty: translatedDifficulty }),
    });
  }, [navigation, difficulty]);

  useEffect(() => {
    const newMatchesPlayed =
      initialProgressionRef.current.games.matchesPlayed + 1;
    const totalCorrect = initialProgressionRef.current.games.totalCorrect;
    const totalIncorrect = initialProgressionRef.current.games.totalIncorrect;
    const updatedProgression: ProgressionStructure =
      createUpdatedProgressionStructure(
        initialProgressionRef.current,
        gameMode,
        difficulty,
        isAdvancementRequirementMet,
        resultPercentage,
        userNextLevel
      );
    persistProgression({
      games: { ...updatedProgression.games, matchesPlayed: newMatchesPlayed },
      passport: updatedProgression.passport,
    });
    PlayGames.submitScore(MATCHES_PLAYED_ID, newMatchesPlayed);
    PlayGames.submitScore(
      ACCURACY_ID,
      calculateLeaderboardScore(totalCorrect, totalCorrect + totalIncorrect)
    );
  }, [
    navigation,
    gameResult,
    gameMode,
    difficulty,
    resultPercentage,
    userNextLevel,
    isAdvancementRequirementMet,
  ]);

  const handleContinue = () =>
    resetToDifficultyScreen(navigation, 'difficulty');

  const handleDisplayScore = () => {
    if (gameMode === 'rapid') return resultPercentage.toString();
    if (resultPercentage === 100) return `${resultPercentage}%`;
    return `${resultPercentage.toFixed(1)}%`;
  };

  const ProgressionSummary = () => {
    if (!unlockedMessage) return null;

    const levelIconsToShow = determineSummaryIcons(difficulty);

    return (
      <View style={styles.progressionContainer}>
        {unlockedMessage && userNextLevel && (
          <Text style={sharedSummaryStyles.valueText}>{unlockedMessage}</Text>
        )}

        {unlockedMessage && userNextLevel && (
          <View style={styles.difficultyImageContainer}>
            {levelIconsToShow.map((difficultyKey) => (
              <Image
                key={String(difficultyKey)}
                style={{
                  height: 56,
                  width: 56,
                  opacity:
                    userProgression.games[gameMode][difficultyKey].isLocked ===
                    false
                      ? 1
                      : 0.3,
                }}
                source={iconsMap[difficultyKey]}
              />
            ))}
          </View>
        )}
      </View>
    );
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
          <View style={styles.titleContainer}>
            <Text style={sharedSummaryStyles.title}>
              {t('completed', { difficulty: translatedDifficulty })}
            </Text>
            <Image
              style={{ height: 56, width: 56 }}
              source={iconsMap[LEVEL_MAP[difficulty]]}
            />
          </View>
          <View style={styles.gameResultContainer}>
            <View style={sharedSummaryStyles.gameResultScoreContainer}>
              <Text style={sharedSummaryStyles.scoreTitleText}>
                {newHighScoreMessage ? newHighScoreMessage : t('score')}
              </Text>
              <Text style={sharedSummaryStyles.scoreValueText}>
                {handleDisplayScore()}
              </Text>
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
                <Text style={sharedSummaryStyles.valueText}>
                  {highestStreak}
                </Text>
              </View>
              <View style={sharedSummaryStyles.gameResultAdvancedItem}>
                <Text style={sharedSummaryStyles.subtitleText}>
                  {t('time')}
                </Text>
                <Text style={sharedSummaryStyles.valueText}>
                  {timeTaken ? formatTime(timeTaken, false) : 'Unlimited'}
                </Text>
              </View>
            </View>
          </View>

          {history.length > 0 && (
            <SummaryHistory
              rows={rows}
              correct={correct}
              incorrect={incorrect}
            />
          )}

          {unlockRequirementMessage && (
            <Text style={sharedSummaryStyles.subtitleText}>
              {unlockRequirementMessage}
            </Text>
          )}

          <ProgressionSummary />
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

export default Summary;
