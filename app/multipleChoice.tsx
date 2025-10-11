import { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { colors } from '@/components/colors';
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

const MultipleChoice = () => {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;
  const dynamicSpacing = isSmallScreen ? 5 : 20;
  const dynamicPadding = isSmallScreen ? 5 : 20;

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'multipleChoice'>>();
  const { t } = useTranslation('data');
  const userProgression = stateStore((state) => state.userProgress);
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
  const timeUpRef = useRef<boolean>(false);
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
    questions[questionNumberIndex];
  const correctAnswer = countryName;

  const isFinalQuestion = questionNumberIndex + 1 === questions.length;
  const isGameCountingUp = timeLimit === 0;

  useEffect(() => {
    setAnswers(
      generateMultipleChoiceAnswers(correctAnswer, difficulty, continent)
    );
  }, [questionNumberIndex, correctAnswer, difficulty, continent]);

  useEffect(() => {
    timeUpRef.current = false;
    const interval = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTimeRef.current) / 1000);

      if (isGameCountingUp) {
        setTimeElapsedInSeconds(elapsedSec);
      } else {
        const remaining = timeLimit - elapsedSec;
        setTimeElapsedInSeconds(Math.max(remaining, 0));

        if (remaining <= 0 && !timeUpRef.current) {
          timeUpRef.current = true;
          if (gameMode !== 'custom') {
            navigation.navigate('summary', {
              difficulty: DIFFICULTY_ID_TO_LEVEL_MAP[difficulty],
              gameMode,
              gameResult: {
                correct: correctTotalRef.current,
                incorrect: incorrectTotalRef.current,
                highestStreak: highestStreakRef.current,
              },
            });
          } else {
            navigation.navigate('customSummary', {
              gameResult: {
                correct: correctTotalRef.current,
                incorrect: incorrectTotalRef.current,
                highestStreak: highestStreakRef.current,
              },
              finalScore: Math.round(customScoreRef.current * scoreMultiplier!),
            });
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameCountingUp, gameMode, navigation, timeLimit]);

  useEffect(() => {
    navigation.setOptions({
      title:
        title === 'Custom'
          ? t('title', { ns: 'custom' })
          : t(`levels.${LEVEL_MAP[title]}`),
      headerRight: () => <Text>{formatTime(timeElapsedInSeconds)}</Text>,
    });
  }, [navigation, timeElapsedInSeconds, title]);

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
        color="blue"
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

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  flagContainer: {
    flex: 2,
  },
  answersContainer: {
    flex: 3,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  answerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: colors.white,
    flexShrink: 1,
    minHeight: 50,
  },
  progressBar: {
    marginBottom: 25,
    borderRadius: 10,
    backgroundColor: colors.white,
    height: 5,
    alignSelf: 'center',
  },
  answerOrderText: {
    color: colors.bluePrimary,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 10,
  },
  answerText: {
    fontSize: 20,
    fontWeight: '500',
    flexShrink: 1,
  },
});

export default MultipleChoice;
