import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ANSWER_LETTERS } from '@/constants/common';
import {
  levelNameByDifficultyId,
  levelKeyByLevelName,
} from '@/constants/lookups';
import determineButtonColor from '@/util/determineButtonColor/determineButtonColor';
import formatTime from '@/util/formatTime/formatTime';
import generateMultipleChoiceAnswers from '@/util/generateMultipleChoiceAnswers/generateMultipleChoiceAnswers';
import flags from '@/assets/images/flags';
import {
  GameResult,
  MultipleChoiceScreenTitles,
  NavigationProps,
  PlayableGameModes,
  RootStackParamList,
} from '@/types/navigation';
import determineScoreToAdd from '@/util/determineScoreToAdd/determineScoreToAdd';
import stateStore from '@/state/store';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import { useTheme } from '@/context/ThemeContext';
import { getMultipleChoiceStyles } from '@/styles/multipleChoice';
import { colors } from '@/components/colors';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_MULTIPLE_CHOICE_ID, BANNER_TEST_ID } from '@/constants/adId';
import updatePassport from '@/util/updatePassport/updatePassport';
import persistProgression from '@/util/persistState/persistProgression';
import { AchievementId } from '@/data/achievements/achievements.config';
import emitAchievementEvent from '@/data/achievements/emitAchievementEvent';

// TODO - investigate race condition that makes passport achievement not show as unlocked on summary screen
// TODO - investigate achievements appearing twice like best streak on 30
// TODO - improve screen scaling such as large font size with ads on tablet

interface IStatsRowProps {
  gameMode: PlayableGameModes;
  isGameCountingUp: boolean;
  timeElapsedInSeconds: number;
  streak: number;
  customScore: number;
  scoreMultiplier: number;
}

const StatsRow = React.memo(
  ({
    gameMode,
    isGameCountingUp,
    timeElapsedInSeconds,
    streak,
    customScore,
    scoreMultiplier,
  }: IStatsRowProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getMultipleChoiceStyles(theme), [theme]);

    const getTimerColor = () => {
      if (isGameCountingUp) return theme.text;
      if (timeElapsedInSeconds <= 10) return colors.incorrectRed;
      if (timeElapsedInSeconds <= 30) return colors.warningOrange;
      return theme.text;
    };

    return (
      <View style={styles.statsRowContainer}>
        <View style={styles.statsRowStreakContainer}>
          <Text style={{ ...styles.statsText, paddingRight: 5 }}>{streak}</Text>
          <Image
            style={styles.statsIcon}
            source={require('@/assets/images/icons/resources/flame.png')}
          />
        </View>
        <View style={styles.statsRowAlignmentContainer}>
          <Text style={{ ...styles.statsText, color: getTimerColor() }}>
            {formatTime(timeElapsedInSeconds)}
          </Text>
        </View>
        {gameMode === 'custom' && (
          <View style={styles.statsRowAlignmentContainer}>
            <Text style={styles.statsText}>
              {Math.round(customScore * scoreMultiplier)}
            </Text>
          </View>
        )}
      </View>
    );
  }
);

const MultipleChoice = () => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;
  const dynamicSpacing = isSmallScreen ? 5 : 20;
  const dynamicPadding = isSmallScreen ? 5 : 20;

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'multipleChoice'>>();
  const { t } = useTranslation('data');
  const { theme } = useTheme();
  const styles = useMemo(() => getMultipleChoiceStyles(theme), [theme]);
  const userProgression = stateStore((s) => s.userProgress);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const { isPremiumUser, displayAnswerTimerMs } = stateStore(
    (s) => s.userSettings
  );
  const showAds = !isPremiumUser && isInternetAvailable;
  const { title, gameMode, questions, timeLimit } = route.params;
  const { scoreMultiplier } = userProgression.games.custom.currentGame;

  const [questionNumberIndex, setQuestionNumberIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [correctTotal, setCorrectTotal] = useState<number>(0);
  const [incorrectTotal, setIncorrectTotal] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] =
    useState<number>(timeLimit);
  const [answerHistory, setAnswerHistory] = useState<GameResult['history']>([]);
  const [customScore, setCustomScore] = useState<number>(0);
  const [tapToAdvance, setTapToAdvance] = useState<boolean>(false);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState<
    AchievementId[]
  >([]);

  const isUserTapToAdvance = displayAnswerTimerMs === 0;

  const passportBeforeQuiz = useMemo(
    () =>
      userProgression.passport.filter((item) =>
        questions
          .map((question) => question.countryCode)
          .includes(item.countryCode)
      ),
    []
  );

  const startTimeRef = useRef<number>(Date.now());
  const correctTotalRef = useRef<number>(correctTotal);
  const incorrectTotalRef = useRef<number>(incorrectTotal);
  const highestStreakRef = useRef<number>(highestStreak);
  const customScoreRef = useRef<number>(customScore);
  const answerHistoryRef = useRef<GameResult['history']>(answerHistory);

  useEffect(() => {
    correctTotalRef.current = correctTotal;
  }, [correctTotal]);

  useEffect(() => {
    incorrectTotalRef.current = incorrectTotal;
  }, [incorrectTotal]);

  useEffect(() => {
    highestStreakRef.current = highestStreak;
  }, [highestStreak]);

  useEffect(() => {
    customScoreRef.current = customScore;
  }, [customScore]);

  useEffect(() => {
    answerHistoryRef.current = answerHistory;
  }, [answerHistory]);

  const { continent, difficulty, countryName, countryCode } =
    questions[questionNumberIndex]!;
  const correctAnswer = countryName;

  const isFinalQuestion = questionNumberIndex + 1 === questions.length;
  const isGameCountingUp = timeLimit === 0;

  useEffect(() => {
    setAnswers(
      generateMultipleChoiceAnswers(correctAnswer, difficulty, continent)
    );
  }, [questionNumberIndex, correctAnswer, difficulty, continent]);

  useEffect(() => {
    const handleTitle = (title: MultipleChoiceScreenTitles) => {
      if (title === 'Custom') return t('title', { ns: 'custom' });
      if (title === 'Practice') return t('practice', { ns: 'practiceSummary' });
      return t(`levels.${levelKeyByLevelName[title]}`);
    };

    navigation.setOptions({
      title: handleTitle(title),
    });
  }, [navigation, timeElapsedInSeconds, title, streak]);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        const elapsedMs = Date.now() - startTimeRef.current;
        const elapsedSec = Math.floor(elapsedMs / 1000);
        const remaining = Math.max(timeLimit - elapsedSec, 0);
        const newValue = isGameCountingUp ? elapsedSec : remaining;

        if (!isGameCountingUp && remaining <= 0) {
          clearInterval(interval);

          const gameResult = {
            correct: correctTotalRef.current,
            incorrect: incorrectTotalRef.current,
            highestStreak: highestStreakRef.current,
            history: answerHistory,
          };

          if (gameMode === 'rapid') {
            navigation.navigate('summary', {
              difficulty: levelNameByDifficultyId[difficulty],
              gameMode,
              gameResult,
              multipleChoiceAchievementsUnlocked: achievementsUnlocked,
            });
          } else {
            navigation.navigate('customSummary', {
              gameResult,
              finalScore: Math.round(customScoreRef.current * scoreMultiplier!),
              multipleChoiceAchievementsUnlocked: achievementsUnlocked,
            });
          }
          return;
        }

        setTimeElapsedInSeconds((prev) =>
          prev !== newValue ? newValue : prev
        );
      }, 200);

      return () => clearInterval(interval);
    }, [
      navigation,
      gameMode,
      timeLimit,
      isGameCountingUp,
      difficulty,
      scoreMultiplier,
    ])
  );

  const handleAnswerPress = (answer: string) => {
    if (!isUserTapToAdvance) setIsButtonDisabled(true);

    if (tapToAdvance) {
      handleNextQuestionOrSummary(correctTotal, incorrectTotal, highestStreak);
      setTapToAdvance(false);
    } else {
      setTapToAdvance(isUserTapToAdvance);
      setUserAnswer(answer);

      const isCorrect = answer === correctAnswer;
      const newCorrectTotal = isCorrect ? correctTotal + 1 : correctTotal;
      const newIncorrectTotal = isCorrect ? incorrectTotal : incorrectTotal + 1;
      const newStreakTotal = isCorrect ? streak + 1 : 0;
      const newHighestStreakTotal = Math.max(highestStreak, newStreakTotal);
      answerHistoryRef.current.push(isCorrect ? 'Correct' : 'Incorrect');

      const newPassport = updatePassport(
        countryCode,
        correctAnswer,
        continent,
        difficulty,
        isCorrect
      );

      setCorrectTotal(newCorrectTotal);
      setIncorrectTotal(newIncorrectTotal);
      setStreak(newStreakTotal);
      setHighestStreak(newHighestStreakTotal);
      setAnswerHistory(answerHistoryRef.current);

      const totalCorrectAchievementEvent = emitAchievementEvent({
        id: 'totalCorrect',
        value: userProgression.games.totalCorrect + (isCorrect ? 1 : 0),
      });

      const bestStreakAchievementEvent = emitAchievementEvent({
        id: 'bestStreak',
        value: Math.max(
          newStreakTotal,
          userProgression.achievements['bestStreak'].currentValue
        ),
      });

      const passportEntriesAchievementEvent = emitAchievementEvent({
        id: 'passportEntries',
        value: newPassport.length,
      });

      totalCorrectAchievementEvent.hasUpdated &&
        setAchievementsUnlocked((prev) => [...prev, 'totalCorrect']);

      bestStreakAchievementEvent.hasUpdated &&
        setAchievementsUnlocked((prev) => [...prev, 'bestStreak']);

      passportEntriesAchievementEvent.hasUpdated &&
        setAchievementsUnlocked((prev) => [...prev, 'passportEntries']);

      persistProgression({
        ...userProgression,
        games: {
          ...userProgression.games,
          totalCorrect: isCorrect
            ? userProgression.games.totalCorrect + 1
            : userProgression.games.totalCorrect,
          totalIncorrect: isCorrect
            ? userProgression.games.totalIncorrect
            : userProgression.games.totalIncorrect + 1,
        },
        passport: newPassport,
        achievements: {
          ...userProgression.achievements,
          totalCorrect: totalCorrectAchievementEvent.updatedAchievementProgress,
          bestStreak: bestStreakAchievementEvent.updatedAchievementProgress,
          passportEntries:
            passportEntriesAchievementEvent.updatedAchievementProgress,
        },
      });

      gameMode === 'custom' &&
        setCustomScore(
          customScore + determineScoreToAdd(isCorrect, difficulty, streak)
        );

      if (!isUserTapToAdvance) {
        setTimeout(() => {
          handleNextQuestionOrSummary(
            newCorrectTotal,
            newIncorrectTotal,
            newHighestStreakTotal
          );
        }, displayAnswerTimerMs);
      }
    }
  };

  const handleNextQuestionOrSummary = (
    correct: number,
    incorrect: number,
    highest: number
  ) => {
    setUserAnswer(null);
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const newTimeTaken = isGameCountingUp ? elapsed : timeLimit - elapsed;

    if (isFinalQuestion) {
      setIsButtonDisabled(true);
      if (gameMode === 'standard' || gameMode === 'rapid') {
        navigation.navigate('summary', {
          difficulty: levelNameByDifficultyId[difficulty],
          gameMode,
          gameResult: {
            correct,
            incorrect,
            highestStreak: highest,
            history: answerHistory,
            timeTaken: isGameCountingUp ? newTimeTaken : undefined,
          },
          multipleChoiceAchievementsUnlocked: achievementsUnlocked,
        });
      } else if (gameMode === 'practice') {
        navigation.navigate('practiceSummary', {
          passportBeforeQuiz,
          gameResult: {
            correct,
            incorrect,
            highestStreak: highest,
            history: answerHistory,
          },
          multipleChoiceAchievementsUnlocked: achievementsUnlocked,
        });
      } else {
        navigation.navigate('customSummary', {
          gameResult: {
            correct: correctTotalRef.current,
            incorrect: incorrectTotalRef.current,
            highestStreak: highestStreakRef.current,
            history: answerHistory,
            timeTaken: isGameCountingUp ? newTimeTaken : undefined,
          },
          finalScore: Math.round(customScoreRef.current * scoreMultiplier),
          multipleChoiceAchievementsUnlocked: achievementsUnlocked,
        });
      }
    } else {
      setQuestionNumberIndex((prev) => prev + 1);
    }

    setAnswers([]);
    setIsButtonDisabled(false);
  };

  return (
    <View style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}>
      <ProgressBar
        progress={questionNumberIndex / questions.length}
        color={colors.bluePrimary}
        style={styles.progressBar}
      />

      <StatsRow
        gameMode={gameMode}
        isGameCountingUp={isGameCountingUp}
        timeElapsedInSeconds={timeElapsedInSeconds}
        streak={streak}
        customScore={customScore}
        scoreMultiplier={scoreMultiplier}
      />

      <View style={styles.flagContainer}>
        <Image
          source={flags[countryCode.toLowerCase()]}
          contentFit="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <View style={styles.answersContainer}>
        {answers.map((item, index) => (
          <Pressable
            key={index.toString()}
            disabled={isButtonDisabled}
            style={({ pressed }) => [
              styles.answerBox,
              {
                opacity: pressed ? 0.7 : 1,
                backgroundColor: determineButtonColor(
                  item,
                  userAnswer,
                  correctAnswer,
                  theme
                ),
                marginTop: dynamicSpacing,
                paddingVertical: dynamicPadding,
              },
            ]}
            onPress={() => handleAnswerPress(item)}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.answerOrderText}>
                {ANSWER_LETTERS[index]}
              </Text>
              <Text
                style={styles.answerText}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                {t(`countries.${toJsonKeyFormat(item)}`)}
              </Text>
            </View>
            {item === correctAnswer && tapToAdvance && (
              <Feather name={'arrow-right'} size={24} color={theme.text} />
            )}
          </Pressable>
        ))}
      </View>
      {showAds && (
        <View style={styles.adContainer}>
          <AdBanner
            adId={__DEV__ ? BANNER_TEST_ID : BANNER_MULTIPLE_CHOICE_ID}
          />
        </View>
      )}
    </View>
  );
};

export default MultipleChoice;
