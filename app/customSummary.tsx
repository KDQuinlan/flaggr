import { useNavigation } from 'expo-router';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/components/colors';
import { useEffect, useMemo, useRef } from 'react';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import stateStore from '@/state/store';
import { ProgressionStructure } from '@/state/secureStoreStructure';
import persistProgression from '@/util/persistProgression/persistProgression';
import createUpdatedProgressionStructure from '@/util/updatedProgressionStructure/createdUpdatedProgressionStructure';
import { resetToDifficultyScreen } from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import formatTime from '@/util/formatTime/formatTime';
import SummaryInfoRow from '@/components/summaryInfoRow/summaryInfoRow';
import createUpdatedCustomProgressionStructure from '@/util/updatedProgressionStructure/createUpdatedCustomProgressionStructure';

// TODO - add time remaining?

const CustomSummary = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'customSummary'>>();
  const userProgression = stateStore((state) => state.userProgress);
  console.log(`High Score - ${userProgression.games.custom.highScore}`);
  const setProgression = stateStore((state) => state.setProgression);
  const { gameResult } = route.params;
  const { correct, incorrect, highestStreak, timeTaken } = gameResult;

  const initialProgressionRef = useRef(userProgression);

  const resultPercentage = useMemo(() => {
    return correct;
  }, [correct, incorrect]);

  const progression = initialProgressionRef.current.games.custom;

  const isNewHighScore = useMemo(
    () => resultPercentage > progression.highScore,
    [progression.highScore, resultPercentage]
  );

  const newHighScoreMessage = isNewHighScore
    ? `New high score - ${resultPercentage}`
    : null;

  useEffect(() => {
    navigation.setOptions({ title: 'Summary - Custom' });
  }, [navigation]);

  useEffect(() => {
    const updatedProgression: ProgressionStructure =
      createUpdatedCustomProgressionStructure(
        initialProgressionRef.current,
        resultPercentage
      );

    setProgression(updatedProgression);
    persistProgression(updatedProgression);
  }, [resultPercentage, setProgression]);

  const handleContinue = () => resetToDifficultyScreen(navigation);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>Custom Game Completed!</Text>
        <Ionicons name="checkmark-circle" size={60} color="green" />
        <Text style={styles.subTitle}>Summary</Text>

        <SummaryInfoRow title="Score" value={resultPercentage.toString()} />
        <SummaryInfoRow title="Correct" value={correct} />
        <SummaryInfoRow title="Incorrect" value={incorrect} />
        <SummaryInfoRow title="Highest streak" value={highestStreak} />
        {timeTaken && (
          <SummaryInfoRow
            title="Time taken"
            value={formatTime(timeTaken, true)}
          />
        )}
        {newHighScoreMessage && <Text>{newHighScoreMessage}</Text>}

        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={handleContinue}
          accessibilityLabel="Continue to difficulty selection"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  summaryContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: colors.offWhite,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
    paddingBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 20,
  },
  buttonText: { fontSize: 20, fontWeight: '500' },
});

export default CustomSummary;
