import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  BackHandler,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import SummaryInfoRow from '@/components/summaryInfoRow/summaryInfoRow';
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
import { MATCHES_PLAYED_ID } from '@/constants/leaderboard';
import PlayGames from '@/PlayGames';
import determineSummaryIcons from '@/util/determineSummaryIcons';
import { getSummaryStyles } from '@/styles/summary';
import { useTheme } from '@/context/ThemeContext';
import { BANNER_TEST_ID } from '@/constants/adId';
import AdBanner from '@/components/AdBanner/AdBanner';

// TODO - remove memoisation for progression and use getState for snapshot?

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
  const route = useRoute<RouteProp<RootStackParamList, 'summary'>>();
  const { t } = useTranslation('summary');
  const { theme } = useTheme();
  const styles = useMemo(() => getSummaryStyles(theme), [theme]);
  const userProgression = stateStore((s) => s.userProgress);
  const setProgression = stateStore((s) => s.setProgression);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const { isPremiumUser } = stateStore((s) => s.userSettings);
  const { difficulty, gameMode, gameResult } = route.params;
  const matchesPlayed = userProgression.games.matchesPlayed;
  const { correct, incorrect, highestStreak, timeTaken } = gameResult;
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

  const scoreDisplay =
    gameMode === 'rapid' ? resultPercentage : resultPercentage.toFixed(1);

  const newHighScoreMessage = isNewHighScore
    ? t('newHighScore', {
        score: scoreDisplay,
        numberSuffix: numberSuffix,
      })
    : null;

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

  useEffect(() => {
    navigation.setOptions({
      title: t('summary', { difficulty: translatedDifficulty }),
    });
  }, [navigation, difficulty]);

  useEffect(() => {
    const newMatchesPlayed = matchesPlayed + 1;
    setProgression({
      games: { ...userProgression.games, matchesPlayed: newMatchesPlayed },
    });
    PlayGames.submitScore(MATCHES_PLAYED_ID, newMatchesPlayed);
  }, []);

  useEffect(() => {
    const updatedProgression: ProgressionStructure =
      createUpdatedProgressionStructure(
        initialProgressionRef.current,
        gameMode,
        difficulty,
        isAdvancementRequirementMet,
        resultPercentage,
        userNextLevel
      );

    setProgression(updatedProgression);
    persistProgression(updatedProgression);
  }, [
    gameMode,
    difficulty,
    resultPercentage,
    userNextLevel,
    isAdvancementRequirementMet,
    setProgression,
  ]);

  const handleContinue = () =>
    resetToDifficultyScreen(navigation, 'difficulty');

  const AnimatedSummary = () => {
    const rows = [
      {
        title: t('score'),
        value:
          gameMode === 'rapid'
            ? resultPercentage.toString()
            : `${resultPercentage.toFixed(1)}%`,
      },
      { title: t('correct'), value: correct },
      { title: t('incorrect'), value: incorrect },
      { title: t('streak'), value: highestStreak },
      ...(timeTaken
        ? [
            {
              title: t('time'),
              value: formatTime(timeTaken, true),
            },
          ]
        : []),
    ];
    const animatedValues = useRef(
      rows.map(() => new Animated.Value(0))
    ).current;

    useEffect(() => {
      const animations = animatedValues.map((val, i) =>
        Animated.timing(val, {
          toValue: 1,
          duration: 400,
          delay: i * 150,
          useNativeDriver: true,
        })
      );

      Animated.stagger(150, animations).start();
    }, [animatedValues]);

    return (
      <View style={styles.animationContainer}>
        {rows.map((row, i) => (
          <Animated.View
            key={i}
            style={{
              opacity: animatedValues[i],
              transform: [
                {
                  translateY: animatedValues[i]!.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
          >
            <SummaryInfoRow title={row.title} value={row.value} />
          </Animated.View>
        ))}
      </View>
    );
  };

  const ProgressionSummary = () => {
    if (!newHighScoreMessage && !unlockRequirementMessage && !unlockedMessage)
      return null;

    const levelIconsToShow = determineSummaryIcons(difficulty);

    return (
      <View style={styles.sectionContainer}>
        {newHighScoreMessage && (
          <Text style={styles.unlockText}>{newHighScoreMessage}</Text>
        )}
        {unlockRequirementMessage && (
          <Text style={styles.unlockText}>{unlockRequirementMessage}</Text>
        )}
        {unlockedMessage && (
          <Text style={styles.unlockText}>{unlockedMessage}</Text>
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
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView style={styles.summaryContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>
            {t('completed', { difficulty: translatedDifficulty })}
          </Text>
          <Image
            style={{ height: 56, width: 56 }}
            source={iconsMap[LEVEL_MAP[difficulty]]}
          />
          <AnimatedSummary />
        </View>
        <ProgressionSummary />

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handleContinue}
            accessibilityLabel={t('continue')}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>{t('continue')}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaView>
  );
};

export default Summary;
