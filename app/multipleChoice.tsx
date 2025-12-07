import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

import { ANSWER_LETTERS } from '@/constants/common';
import { DIFFICULTY_ID_TO_LEVEL_MAP, LEVEL_MAP } from '@/constants/mappers';
import determineButtonColor from '@/util/determineButtonColor/determineButtonColor';
import formatTime from '@/util/formatTime/formatTime';
import generateMultipleChoiceAnswers from '@/util/generateMultipleChoiceAnswers/generateMultipleChoiceAnswers';
import flags from '@/assets/images/flags';
import {
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
import { BANNER_TEST_ID } from '@/constants/adId';
import updatePassport from '@/util/updatePassport/updatePassport';
import persistProgression from '@/util/persistState/persistProgression';

interface IStatsRowProps {
  gameMode: PlayableGameModes;
  timeElapsedInSeconds: number;
  streak: number;
  customScore: number;
  scoreMultiplier: number;
}

const StatsRow = React.memo(
  ({
    gameMode,
    timeElapsedInSeconds,
    streak,
    customScore,
    scoreMultiplier,
  }: IStatsRowProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getMultipleChoiceStyles(theme), [theme]);

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
          <Text style={styles.statsText}>
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
  const [customScore, setCustomScore] = useState<number>(0);
  const [tapToAdvance, setTapToAdvance] = useState<boolean>(false);

  const isUserTapToAdvance = displayAnswerTimerMs === 0;

  const startTimeRef = useRef<number>(Date.now());
  const correctTotalRef = useRef<number>(correctTotal);
  const incorrectTotalRef = useRef<number>(incorrectTotal);
  const highestStreakRef = useRef<number>(highestStreak);
  const customScoreRef = useRef<number>(customScore);

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
    navigation.setOptions({
      title:
        title === 'Custom'
          ? t('title', { ns: 'custom' })
          : t(`levels.${LEVEL_MAP[title]}`),
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
          };

          if (gameMode !== 'custom') {
            navigation.navigate('summary', {
              difficulty: DIFFICULTY_ID_TO_LEVEL_MAP[difficulty],
              gameMode,
              gameResult,
            });
          } else {
            navigation.navigate('customSummary', {
              gameResult,
              finalScore: Math.round(customScoreRef.current * scoreMultiplier!),
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

      setCorrectTotal(newCorrectTotal);
      setIncorrectTotal(newIncorrectTotal);
      setStreak(newStreakTotal);
      setHighestStreak(newHighestStreakTotal);

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
      });

      updatePassport(
        countryCode,
        correctAnswer,
        continent,
        difficulty,
        isCorrect
      );

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
      if (gameMode !== 'custom') {
        navigation.navigate('summary', {
          difficulty: DIFFICULTY_ID_TO_LEVEL_MAP[difficulty],
          gameMode,
          gameResult: {
            correct,
            incorrect,
            highestStreak: highest,
            timeTaken: isGameCountingUp ? newTimeTaken : undefined,
          },
        });
      } else {
        navigation.navigate('customSummary', {
          gameResult: {
            correct: correctTotalRef.current,
            incorrect: incorrectTotalRef.current,
            highestStreak: highestStreakRef.current,
            timeTaken: isGameCountingUp ? newTimeTaken : undefined,
          },
          finalScore: Math.round(customScoreRef.current * scoreMultiplier),
        });
      }
    } else {
      setQuestionNumberIndex((prev) => prev + 1);
    }

    setAnswers([]);
    setIsButtonDisabled(false);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ProgressBar
        progress={questionNumberIndex / questions.length}
        color={colors.bluePrimary}
        style={styles.progressBar}
      />

      <StatsRow
        gameMode={gameMode}
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
            alignSelf: 'center',
            aspectRatio: 4 / 3,
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
          <AdBanner adId={BANNER_TEST_ID} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MultipleChoice;
