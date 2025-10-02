import { useEffect, useRef, useState } from 'react';
import { colors } from '@/components/colors';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { useNavigation } from 'expo-router';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import generateMultipleChoiceAnswers from '@/util/generateMultipleChoiceAnswers/generateMultipleChoiceAnswers';
import formatTime from '@/util/formatTime/formatTime';
import { ANSWER_LETTERS } from '@/constants/common';
import determineButtonColor from '@/util/determineButtonColor/determineButtonColor';
import flags from '@/assets/images/flags';
import { DIFFICULTY_ID_TO_LEVEL_MAP } from '@/constants/mappers';

const MultipleChoice = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'multipleChoice'>>();
  const { title, gameMode, questions, timeLimit } = route.params;

  const [questionNumberIndex, setQuestionNumberIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[] | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [incorrectTotal, setIncorrectTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(timeLimit);

  const startTimeRef = useRef<number>(Date.now());
  const correctTotalRef = useRef<number>(correctTotal);
  const incorrectTotalRef = useRef<number>(incorrectTotal);
  const highestStreakRef = useRef<number>(highestStreak);
  const timeUpRef = useRef<boolean>(false);

  useEffect(() => {
    correctTotalRef.current = correctTotal;
  }, [correctTotal]);

  useEffect(() => {
    incorrectTotalRef.current = incorrectTotal;
  }, [incorrectTotal]);

  useEffect(() => {
    highestStreakRef.current = highestStreak;
  }, [highestStreak]);

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
            });
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameCountingUp, gameMode, navigation, timeLimit]);

  useEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => <Text>{formatTime(timeElapsedInSeconds)}</Text>,
    });
  }, [navigation, timeElapsedInSeconds, title]);

  const FlagComponent = flags[countryCode.toLowerCase()];

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
        });
      }
    } else {
      setQuestionNumberIndex((prev) => prev + 1);
    }

    setAnswers(null);
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
        <FlagComponent
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        />
      </View>
      <View style={styles.answersContainer}>
        <FlatList
          data={answers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              disabled={isButtonDisabled}
              activeOpacity={0.8}
              style={{
                ...styles.answerBox,
                backgroundColor: determineButtonColor(
                  item,
                  userAnswer,
                  correctAnswer
                ),
              }}
              onPress={() => handleAnswerPress(item)}
            >
              <Text style={styles.answerOrderText}>
                {ANSWER_LETTERS[index]}
              </Text>
              <Text style={styles.answerText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
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
  },
  answerBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 5,
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
  },
});

export default MultipleChoice;
