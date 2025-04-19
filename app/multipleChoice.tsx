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

const MultipleChoice = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'multipleChoice'>>();
  const { name, difficulty, questions } = route.params;
  const [questionNumberIndex, setQuestionNumberIndex] = useState(0);
  const answerLetters = ['a. ', 'b. ', 'c. ', 'd. '];

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
          data={generateMultipleChoiceAnswers(
            questions[questionNumberIndex].countryName,
            difficulty,
            questions[questionNumberIndex].continent
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.answerBox}
              onPress={() => setQuestionNumberIndex(questionNumberIndex + 1)}
            >
              <Text>{answerLetters[index]}</Text>
              <Text>{item}</Text>
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
});

export default MultipleChoice;
