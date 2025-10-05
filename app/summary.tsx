import { useNavigation } from 'expo-router';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { colors } from '@/components/colors';
import { useEffect, useMemo, useRef } from 'react';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import stateStore from '@/state/store';
import { TO_PERCENTAGE_MULTIPLIER } from '@/constants/common';
import { LEVEL_MAP } from '@/constants/mappers';
import getNextLevelKey from '@/util/getNextLevelKey/getNextLevelKey';
import { ProgressionStructure } from '@/state/secureStoreStructure';
import persistProgression from '@/util/persistProgression/persistProgression';
import createUpdatedProgressionStructure from '@/util/updatedProgressionStructure/createdUpdatedProgressionStructure';
import { resetToDifficultyScreen } from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import formatTime from '@/util/formatTime/formatTime';
import SummaryInfoRow from '@/components/summaryInfoRow/summaryInfoRow';
import iconsMap from '@/assets/images/icons';
import typedKeys from '@/util/typedKeys/typedKeys';

const Summary = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'summary'>>();
  const userProgression = stateStore((state) => state.userProgress);
  const setProgression = stateStore((state) => state.setProgression);
  const { difficulty, gameMode, gameResult } = route.params;
  const { correct, incorrect, highestStreak, timeTaken } = gameResult;

  const initialProgressionRef = useRef(userProgression);

  const resultPercentage = useMemo(() => {
    if (gameMode !== 'standard') return correct;
    return correct + incorrect > 0
      ? (correct / (correct + incorrect)) * TO_PERCENTAGE_MULTIPLIER
      : 0;
  }, [correct, incorrect, gameMode]);

  const progression =
    initialProgressionRef.current.games[gameMode][LEVEL_MAP[difficulty]];

  const isAdvancementRequirementMet = useMemo(
    () => resultPercentage >= progression.advancementRequirement,
    [resultPercentage, progression.advancementRequirement]
  );

  const userNextLevel = getNextLevelKey(
    gameMode,
    progression.id,
    initialProgressionRef.current
  );

  const userNextLevelProgression =
    userNextLevel &&
    initialProgressionRef.current.games[gameMode][LEVEL_MAP[userNextLevel]];

  const initialIsNextLevelLocked = useMemo(
    () =>
      userNextLevel
        ? initialProgressionRef.current.games[gameMode][
            LEVEL_MAP[userNextLevel]
          ].isLocked
        : false,
    [gameMode, userNextLevel]
  );

  const isNewHighScore = useMemo(
    () => resultPercentage > progression.userScore,
    [progression.isCompleted, progression.userScore, resultPercentage]
  );

  const unlockedMessage =
    initialIsNextLevelLocked && isAdvancementRequirementMet && userNextLevel
      ? `You've unlocked ${userNextLevel}!`
      : null;

  const newHighScoreMessage = isNewHighScore
    ? `New high score - ${
        gameMode === 'rapid'
          ? resultPercentage
          : `${resultPercentage.toFixed(1)}%`
      }`
    : null;

  const unlockRequirementMessage =
    userNextLevelProgression &&
    userNextLevelProgression.isLocked &&
    !isAdvancementRequirementMet
      ? `To unlock ${userNextLevel}, you need a score of ${
          userNextLevelProgression.advancementRequirement
        }${gameMode === 'rapid' ? '' : '%'}`
      : null;

  useEffect(() => {
    navigation.setOptions({ title: `Summary - ${difficulty}` });
  }, [navigation, difficulty]);

  useEffect(() => {
    const updatedProgression: ProgressionStructure =
      createUpdatedProgressionStructure(
        initialProgressionRef.current,
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

  const handleContinue = () => resetToDifficultyScreen(navigation);

  const AnimatedSummary = () => {
    const rows = [
      {
        title: 'Score',
        value:
          gameMode === 'rapid'
            ? resultPercentage.toString()
            : `${resultPercentage.toFixed(1)}%`,
      },
      { title: 'Correct', value: correct },
      { title: 'Incorrect', value: incorrect },
      { title: 'Highest streak', value: highestStreak },
      ...(timeTaken
        ? [{ title: 'Time taken', value: formatTime(timeTaken, true) }]
        : []),
    ];
    const animatedValues = useRef(
      rows.map(() => new Animated.Value(0))
    ).current;

    useEffect(() => {
      const animations = animatedValues.map((val, i) =>
        Animated.timing(val, {
          toValue: 1,
          duration: 400,
          delay: i * 150,
          useNativeDriver: true,
        })
      );

      Animated.stagger(150, animations).start();
    }, [animatedValues]);

    return (
      <View style={styles.animationContainer}>
        {rows.map((row, i) => (
          <Animated.View
            key={i}
            style={{
              opacity: animatedValues[i],
              transform: [
                {
                  translateY: animatedValues[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
          >
            <SummaryInfoRow title={row.title} value={row.value} />
          </Animated.View>
        ))}
      </View>
    );
  };

  const ProgressionSummary = () => {
    if (!newHighScoreMessage && !unlockRequirementMessage && !unlockedMessage)
      return null;

    return (
      <View style={styles.sectionContainer}>
        {newHighScoreMessage && <Text>{newHighScoreMessage}</Text>}
        {unlockRequirementMessage && <Text>{unlockRequirementMessage}</Text>}
        {unlockedMessage && <Text>{unlockedMessage}</Text>}

        {unlockedMessage && userNextLevel && (
          <View style={styles.difficultyImageContainer}>
            {typedKeys(userProgression.games[gameMode]).map((difficultyKey) => (
              <Image
                key={String(difficultyKey)}
                style={{
                  height: 56,
                  width: 56,
                  opacity:
                    userProgression.games[gameMode][difficultyKey].isLocked ===
                    false
                      ? 1
                      : 0.3,
                }}
                source={iconsMap[difficultyKey]}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView style={styles.summaryContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>{difficulty} Completed!</Text>
          <Image
            style={{ height: 56, width: 56 }}
            source={iconsMap[LEVEL_MAP[difficulty]]}
          />
          <AnimatedSummary />
        </View>
        <ProgressionSummary />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleContinue}
            accessibilityLabel="Continue to difficulty selection"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  summaryContainer: {
    paddingHorizontal: 12,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  buttonContainer: {
    backgroundColor: colors.offWhite,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyImageContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.bluePrimary,
    paddingVertical: 10,
    borderRadius: 5,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    paddingBottom: 10,
  },
  buttonText: { fontSize: 20, fontWeight: '500', color: colors.white },
});

export default Summary;
