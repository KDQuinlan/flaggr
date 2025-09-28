import React from 'react';
import { colors } from '@/components/colors';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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
import { ANSWER_LETTERS, RAPID_TIME_ALLOWANCE_IN_S } from '@/constants/common';
import determineButtonColor from '@/util/determineButtonColor/determineButtonColor';
import { LEVEL_TO_DIFFICULTY_ID_MAP } from '@/constants/mappers';
import flags from '@/assets/images/flags';

const MultipleChoice = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'multipleChoice'>>();
  const { difficulty, gameMode, questions } = route.params;

  const [questionNumberIndex, setQuestionNumberIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[] | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [correctTotal, setCorrectTotal] = useState<number>(0);
  const [incorrectTotal, setIncorrectTotal] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState<number>(
    gameMode === 'rapid' ? RAPID_TIME_ALLOWANCE_IN_S : 0
  );
  const timeRef = useRef<number>(
    gameMode === 'rapid' ? RAPID_TIME_ALLOWANCE_IN_S * 1000 : 0
  );
  const correctTotalRef = useRef<number>(0);
  const incorrectTotalRef = useRef<number>(0);
  const highestStreakRef = useRef<number>(0);

  const correctAnswer = questions[questionNumberIndex].countryName;
  const continent = questions[questionNumberIndex].continent;
  const isFinalQuestion = questionNumberIndex + 1 === questions.length;
  const isGameCountingUp = gameMode === 'standard';

  useEffect(() => {
    correctTotalRef.current = correctTotal;
    incorrectTotalRef.current = incorrectTotal;
    highestStreakRef.current = highestStreak;
  }, [correctTotal, incorrectTotal, highestStreak]);

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current += isGameCountingUp ? 100 : -100;
      if (timeRef.current % 1000 === 0 || timeRef.current <= 0) {
        setTimeElapsedInSeconds(
          isGameCountingUp
            ? timeRef.current / 1000
            : Math.max(timeRef.current / 1000, 0)
        );
      }
      if (!isGameCountingUp && timeRef.current <= 0) {
        navigation.navigate('summary', {
          difficulty,
          gameMode,
          gameResult: {
            correct: correctTotalRef.current,
            incorrect: incorrectTotalRef.current,
            highestStreak: highestStreakRef.current,
          },
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [navigation, isGameCountingUp]);

  useEffect(() => {
    navigation.setOptions({
      title: difficulty,
      headerRight: () => <Text>{formatTime(timeElapsedInSeconds, false)}</Text>,
    });
  }, [navigation, timeElapsedInSeconds]);

  !answers &&
    setAnswers(
      generateMultipleChoiceAnswers(
        correctAnswer,
        LEVEL_TO_DIFFICULTY_ID_MAP[difficulty],
        continent
      )
    );

  const FlagComponent =
    flags[questions[questionNumberIndex].countryCode.toLowerCase()];

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
              onPress={() => {
                setIsButtonDisabled(true);
                setUserAnswer(item);

                const isCorrect = item === correctAnswer;
                const newCorrectTotal = isCorrect
                  ? correctTotal + 1
                  : correctTotal;
                const newIncorrectTotal = isCorrect
                  ? incorrectTotal
                  : incorrectTotal + 1;
                const newStreakTotal = isCorrect ? streak + 1 : 0;
                const newHighestStreakTotal = Math.max(
                  highestStreak,
                  newStreakTotal
                );
                const newTimeTaken = isGameCountingUp
                  ? timeRef.current / 1000
                  : RAPID_TIME_ALLOWANCE_IN_S - timeRef.current / 1000;

                setCorrectTotal(newCorrectTotal);
                setIncorrectTotal(newIncorrectTotal);
                setStreak(newStreakTotal);
                setHighestStreak(newHighestStreakTotal);

                setTimeout(() => {
                  setUserAnswer(null);

                  if (isFinalQuestion) {
                    setIsButtonDisabled(true);
                    navigation.navigate('summary', {
                      difficulty,
                      gameMode,
                      gameResult: {
                        correct: newCorrectTotal,
                        incorrect: newIncorrectTotal,
                        highestStreak: newHighestStreakTotal,
                        timeTaken:
                          gameMode === 'standard' ? newTimeTaken : undefined,
                      },
                    });
                  } else {
                    setQuestionNumberIndex((prev) => prev + 1);
                  }

                  setAnswers(null);
                  setIsButtonDisabled(false);
                }, 500);
              }}
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
  image: {
    flex: 1,
    marginHorizontal: 20,
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
