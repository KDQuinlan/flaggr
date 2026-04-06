import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View, BackHandler, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import iconsMap from '@/assets/images/icons';
import {
  levelKeyByLevelName,
  flagAmountByLevelName,
} from '@/constants/lookups';
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
import calculateProgressionExperienceGain from '@/util/leveling/calculateProgressionExperienceGain';
import calculateUserLevelData from '@/util/leveling/calculateUserLevelData';
import AnimatedXpProgressBar from '@/components/animatedXpProgressBar/animatedXpProgressBar';
import formatPercent from '@/util/formatPercent/formatPercent';
import { AchievementId } from '@/data/achievements/achievements.config';
import emitAchievementEvent from '@/data/achievements/emitAchievementEvent';
import AchievementCarousel from '@/components/achievementSummary/achievementCarousel';

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

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();
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
  const userSettings = stateStore((s) => s.userSettings);
  const { isPremiumUser } = userSettings;
  const { userLevel } = userProgression;
  const {
    difficulty,
    gameMode,
    gameResult,
    multipleChoiceAchievementsUnlocked,
  } = route.params;
  const { correct, incorrect, highestStreak, history, timeTaken } = gameResult;
  const numberSuffix = gameMode === 'rapid' ? '' : '%';
  const translatedDifficulty = t(`levels.${levelKeyByLevelName[difficulty]}`, {
    ns: 'data',
  });

  const showAds = !isPremiumUser && isInternetAvailable;

  const [achievementsUnlocked, setAchievementsUnlocked] = useState<
    AchievementId[]
  >(multipleChoiceAchievementsUnlocked);

  const initialProgressionRef = useRef(userProgression);
  const initialUserLevelRef = useRef(userLevel);

  const resultPercentage = useMemo(() => {
    if (gameMode !== 'standard') return correct;
    return correct + incorrect > 0
      ? (correct / (correct + incorrect)) * TO_PERCENTAGE_MULTIPLIER
      : 0;
  }, [correct, incorrect, gameMode]);

  const progression =
    initialProgressionRef.current.games[gameMode][
      levelKeyByLevelName[difficulty]
    ];

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
    initialProgressionRef.current.games[gameMode][
      levelKeyByLevelName[userNextLevel]
    ];

  const initialIsNextLevelLocked = useMemo(
    () =>
      userNextLevel
        ? initialProgressionRef.current.games[gameMode][
            levelKeyByLevelName[userNextLevel]
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
          userNextLevel: t(`levels.${levelKeyByLevelName[userNextLevel]}`, {
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
          userNextLevel: t(`levels.${levelKeyByLevelName[userNextLevel]}`, {
            ns: 'data',
          }),
          advancementRequirement:
            userNextLevelProgression.advancementRequirement,
          numberSuffix: numberSuffix,
        })
      : null;

  const rows = chunkArray(history, 10);

  const isFirstTimeCompletingLevel =
    progression.userScore < progression.advancementRequirement &&
    isAdvancementRequirementMet;

  const isFirstTimePerfectingLevel =
    (progression.userScore !== 100 ||
      progression.userScore !== flagAmountByLevelName[difficulty]) &&
    ((correct / (correct + incorrect)) * TO_PERCENTAGE_MULTIPLIER === 100 ||
      correct / flagAmountByLevelName[difficulty] === 1);

  const hasPerfectedAllLevels = Object.values(
    userProgression.games[gameMode]
  ).every(
    (entry) => entry.userScore === entry.length || entry.userScore === 100
  );

  const experienceGained = calculateProgressionExperienceGain({
    difficultyLevel: difficulty,
    correct: correct,
    levelCompletedFirstTimeBonus: isFirstTimeCompletingLevel,
    levelPerfectedFirstTimeBonus: isFirstTimePerfectingLevel,
    allCompletedFirstTimeBonus: !userNextLevel && isFirstTimeCompletingLevel,
    allPerfectedFirstTimeBonus:
      isFirstTimePerfectingLevel && hasPerfectedAllLevels,
  });

  const newUserLevelData = calculateUserLevelData({
    userLevel: initialUserLevelRef.current,
    experienceGained,
  });

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

    const achievementProgressionId: AchievementId =
      gameMode === 'standard' ? 'standardProgression' : 'rapidProgression';

    const achievementPerfectionId: AchievementId =
      gameMode === 'standard' ? 'standardPerfection' : 'rapidPerfection';

    const matchesPlayedAchievementEvent = emitAchievementEvent({
      id: 'matchesPlayed',
      value: newMatchesPlayed,
    });

    const progressionAchievementEvent = emitAchievementEvent({
      id: achievementProgressionId,
      value: isFirstTimeCompletingLevel
        ? userProgression.achievements[achievementProgressionId].currentValue +
          1
        : userProgression.achievements[achievementProgressionId].currentValue,
    });

    const perfectionAchievementEvent = emitAchievementEvent({
      id: achievementPerfectionId,
      value: isFirstTimePerfectingLevel
        ? userProgression.achievements[achievementPerfectionId].currentValue + 1
        : userProgression.achievements[achievementPerfectionId].currentValue,
    });

    matchesPlayedAchievementEvent.hasUpdated &&
      setAchievementsUnlocked((prev) => [...prev, 'matchesPlayed']);

    progressionAchievementEvent.hasUpdated &&
      setAchievementsUnlocked((prev) => [...prev, achievementProgressionId]);

    perfectionAchievementEvent.hasUpdated &&
      setAchievementsUnlocked((prev) => [...prev, achievementPerfectionId]);

    persistProgression({
      games: { ...updatedProgression.games, matchesPlayed: newMatchesPlayed },
      passport: updatedProgression.passport,
      achievements: {
        ...userProgression.achievements,
        matchesPlayed: matchesPlayedAchievementEvent.updatedAchievementProgress,
        [achievementProgressionId]:
          progressionAchievementEvent.updatedAchievementProgress,
        [achievementPerfectionId]:
          perfectionAchievementEvent.updatedAchievementProgress,
      },
      userLevel: newUserLevelData,
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
    return t('scorePercent', { number: formatPercent(resultPercentage) });
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

  const achievements: AchievementId[] = achievementsUnlocked;

  return (
    <View
      style={{
        ...sharedSummaryStyles.rootContainer,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={sharedSummaryStyles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={sharedSummaryStyles.title}>
              {t('completed', { difficulty: translatedDifficulty })}
            </Text>
            <Image
              style={styles.icon}
              source={iconsMap[levelKeyByLevelName[difficulty]]}
            />
          </View>

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

          {achievements.length > 0 && (
            <Text
              style={{
                ...sharedSummaryStyles.valueText,
                marginBottom: -15,
                marginTop: -5,
              }}
            >
              {t('achievements', { ns: 'profile' })}
            </Text>
          )}

          {achievements.length > 0 && (
            <AchievementCarousel
              achievements={achievements}
              userProgression={userProgression}
            />
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
    </View>
  );
};

export default Summary;
