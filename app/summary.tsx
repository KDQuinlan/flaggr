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
import { TO_PERCENTAGE_MULTIPLIER } from '@/constants/common';
import { LEVEL_MAP } from '@/constants/mappers';
import getNextLevelKey from '@/util/progression/progression';
import { ProgressionStructure } from '@/state/secureStoreStructure';
import persistProgression from '@/util/persistProgression/persistProgression';
import createUpdatedProgressionStructure from '@/util/createdUpdatedProgressionStructure/createdUpdatedProgressionStructure';
import { resetToDifficultyScreen } from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import formatTime from '@/util/formatTime/formatTime';

const Summary = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'summary'>>();
  const userProgression = stateStore((state) => state.userProgress);
  const setProgression = stateStore((state) => state.setProgression);
  const { difficulty, gameMode, gameResult } = route.params;
  const { correct, incorrect, highestStreak, timeTaken } = gameResult;

  const resultPercentage = useMemo(
    () =>
      correct + incorrect > 0
        ? (correct / (correct + incorrect)) * TO_PERCENTAGE_MULTIPLIER
        : 0,
    [correct, incorrect]
  );

  const progression = userProgression.games[gameMode][LEVEL_MAP[difficulty]];
  const initialProgressionRef = useRef(userProgression);
  const isAdvancementRequirementMet =
    resultPercentage >= progression.advancementRequirement;
  const userNextLevel = getNextLevelKey(
    gameMode,
    progression.id,
    userProgression
  );

  const initialIsNextLevelLocked = useMemo(
    () =>
      userNextLevel
        ? initialProgressionRef.current.games[gameMode][
            LEVEL_MAP[userNextLevel]
          ].isLocked
        : false,
    [gameMode, difficulty, userNextLevel]
  );

  const isNewHighScore = useMemo(
    () =>
      initialProgressionRef.current.games[gameMode][LEVEL_MAP[difficulty]]
        .isCompleted &&
      resultPercentage >
        initialProgressionRef.current.games[gameMode][LEVEL_MAP[difficulty]]
          .userScore,
    [gameMode, difficulty, resultPercentage]
  );

  useEffect(() => {
    navigation.setOptions({
      title: `Summary - ${difficulty}`,
    });
  }, [navigation, difficulty]);

  useEffect(() => {
    const updatedProgression: ProgressionStructure =
      createUpdatedProgressionStructure(
        userProgression,
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

  const handleContinue = () => {
    resetToDifficultyScreen(navigation, gameMode);
  };

  const SummaryInfoRow = ({
    title,
    value,
  }: {
    title: string;
    value: number | string;
  }) => (
    <View style={styles.summaryInfoContainer}>
      <Text>{title}:</Text>
      <Text>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>{difficulty} Completed!</Text>
        <Ionicons name="checkmark-circle" size={60} color="green" />
        <Text style={styles.subTitle}>Summary</Text>

        <SummaryInfoRow
          title="Score"
          value={`${resultPercentage.toFixed(1)}%`}
        />
        <SummaryInfoRow title="Correct" value={correct} />
        <SummaryInfoRow title="Incorrect" value={incorrect} />
        <SummaryInfoRow title="Highest streak" value={highestStreak} />
        <SummaryInfoRow
          title="Time taken"
          value={formatTime(timeTaken, true)}
        />
        {initialIsNextLevelLocked &&
          isAdvancementRequirementMet &&
          userNextLevel && <Text>You've unlocked {userNextLevel}</Text>}
        {isNewHighScore && <Text>New high score - {resultPercentage}%</Text>}
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
  summaryInfoContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default Summary;
