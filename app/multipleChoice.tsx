import { colors } from '@/components/colors';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import generateMultipleChoiceAnswers from '@/util/generateMultipleChoiceAnswers/generateMultipleChoiceAnswers';

// On navigate to summary screen, remove last item in navigation stack
// TODO - Add animation fading

const MultipleChoice = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'multipleChoice'>>();
  const { name, difficulty, questions } = route.params;
  const [questionNumberIndex, setQuestionNumberIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[] | null>(null);

  const answerLetters = ['A.', 'B.', 'C.', 'D.'];
  const correctAnswer = questions[questionNumberIndex].countryName;
  const continent = questions[questionNumberIndex].continent;
  const isFinalQuestion =
    questionNumberIndex + 1 === questions.length ? true : false;

  !answers &&
    setAnswers(
      generateMultipleChoiceAnswers(correctAnswer, difficulty, continent)
    );

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ProgressBar
        progress={questionNumberIndex / questions.length}
        color="blue"
        style={styles.progressBar}
      />
      <View style={styles.flagContainer}>
        <Image
          source={{
            uri: `https://flagcdn.com/w320/${questions[questionNumberIndex].countryCode.toLowerCase()}.png`,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.answersContainer}>
        <FlatList
          data={answers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.answerBox,
                backgroundColor:
                  item !== userAnswer
                    ? colors.white
                    : userAnswer === correctAnswer
                      ? 'green'
                      : 'red',
              }}
              onPress={() => {
                setUserAnswer(item);
                setTimeout(() => {
                  setUserAnswer(null);
                  isFinalQuestion
                    ? console.log('Navigate to summary screen')
                    : setQuestionNumberIndex(questionNumberIndex + 1);
                  setAnswers(null);
                }, 500);
              }}
            >
              <Text style={styles.answerOrderText}>{answerLetters[index]}</Text>
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
