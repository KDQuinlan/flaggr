import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { ANSWER_LETTERS } from '@/constants/common';
import { DIFFICULTY_ID_TO_LEVEL_MAP, LEVEL_MAP } from '@/constants/mappers';
import determineButtonColor from '@/util/determineButtonColor/determineButtonColor';
import formatTime from '@/util/formatTime/formatTime';
import generateMultipleChoiceAnswers from '@/util/generateMultipleChoiceAnswers/generateMultipleChoiceAnswers';
import flags from '@/assets/images/flags';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import determineScoreToAdd from '@/util/determineScoreToAdd/determineScoreToAdd';
import stateStore from '@/state/store';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import { useTheme } from '@/context/ThemeContext';
import { getMultipleChoiceStyles } from '@/styles/multipleChoice';
import { colors } from '@/components/colors';

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
      headerRight: () => (
        <Text style={{ fontFamily: 'DMSansBold', color: theme.text }}>
          {formatTime(timeElapsedInSeconds)}
        </Text>
      ),
    });
  }, [navigation, timeElapsedInSeconds, title]);

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
    setIsButtonDisabled(true);
    setUserAnswer(answer);

    const isCorrect = answer === correctAnswer;
    const newCorrectTotal = isCorrect ? correctTotal + 1 : correctTotal;
    const newIncorrectTotal = isCorrect ? incorrectTotal : incorrectTotal + 1;
    const newStreakTotal = isCorrect ? streak + 1 : 0;
    const newHighestStreakTotal = Math.max(highestStreak, newStreakTotal);

    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const newTimeTaken = isGameCountingUp ? elapsed : timeLimit - elapsed;

    setCorrectTotal(newCorrectTotal);
    setIncorrectTotal(newIncorrectTotal);
    setStreak(newStreakTotal);
    setHighestStreak(newHighestStreakTotal);

    gameMode === 'custom' &&
      setCustomScore(
        customScore + determineScoreToAdd(isCorrect, difficulty, streak)
      );

    setTimeout(() => {
      handleNextQuestionOrSummary(
        newCorrectTotal,
        newIncorrectTotal,
        newHighestStreakTotal,
        newTimeTaken
      );
    }, 500);
  };

  const handleNextQuestionOrSummary = (
    correct: number,
    incorrect: number,
    highest: number,
    timeTaken: number
  ) => {
    setUserAnswer(null);

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
            timeTaken: isGameCountingUp ? timeTaken : undefined,
          },
        });
      } else {
        navigation.navigate('customSummary', {
          gameResult: {
            correct: correctTotalRef.current,
            incorrect: incorrectTotalRef.current,
            highestStreak: highestStreakRef.current,
            timeTaken: isGameCountingUp ? timeTaken : undefined,
          },
          finalScore: Math.round(customScoreRef.current * scoreMultiplier!),
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
          <TouchableOpacity
            key={index.toString()}
            disabled={isButtonDisabled}
            activeOpacity={0.8}
            style={[
              styles.answerBox,
              {
                backgroundColor: determineButtonColor(
                  item,
                  userAnswer,
                  correctAnswer
                ),
                marginTop: dynamicSpacing,
                paddingVertical: dynamicPadding,
              },
            ]}
            onPress={() => handleAnswerPress(item)}
          >
            <Text style={styles.answerOrderText}>{ANSWER_LETTERS[index]}</Text>
            <Text
              style={styles.answerText}
              adjustsFontSizeToFit
              numberOfLines={2}
            >
              {t(`countries.${toJsonKeyFormat(item)}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MultipleChoice;
