import { useEffect, useMemo, useRef } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from 'expo-router';

import { colors } from '@/components/colors';
import SummaryInfoRow from '@/components/summaryInfoRow/summaryInfoRow';
import stateStore from '@/state/store';
import { ProgressionStructure } from '@/state/secureStoreStructure';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import persistProgression from '@/util/persistProgression/persistProgression';
import resetToDifficultyScreen from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import formatTime from '@/util/formatTime/formatTime';
import createUpdatedCustomProgressionStructure from '@/util/updatedProgressionStructure/createUpdatedCustomProgressionStructure';

const CustomSummary = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'customSummary'>>();
  const userProgression = stateStore((state) => state.userProgress);
  const setProgression = stateStore((state) => state.setProgression);
  const { gameResult, score } = route.params;
  const { correct, incorrect, highestStreak, timeTaken } = gameResult;

  const initialProgressionRef = useRef(userProgression);
  const progression = initialProgressionRef.current.games.custom;

  const isNewHighScore = useMemo(
    () => score > progression.highScore,
    [progression.highScore, score]
  );

  const newHighScoreMessage = isNewHighScore
    ? `New High Score - ${score}`
    : null;

  useEffect(() => {
    navigation.setOptions({ title: 'Summary - Custom' });
  }, [navigation]);

  useEffect(() => {
    const updatedProgression: ProgressionStructure =
      createUpdatedCustomProgressionStructure(
        initialProgressionRef.current,
        score
      );

    setProgression(updatedProgression);
    persistProgression(updatedProgression);
  }, [score, setProgression]);

  const handleContinue = () => resetToDifficultyScreen(navigation);

  const AnimatedSummary = () => {
    const rows = [
      {
        title: 'Score',
        value: score,
      },
      { title: 'Correct', value: correct },
      { title: 'Incorrect', value: incorrect },
      { title: 'Best Streak', value: highestStreak },
      ...(timeTaken
        ? [{ title: 'Time', value: formatTime(timeTaken, true) }]
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

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView style={styles.summaryContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Completed!</Text>
          {/* <Ionicons name="checkmark-circle" size={60} color="green" /> */}
          <AnimatedSummary />
        </View>
        {isNewHighScore && (
          <View style={styles.sectionContainer}>
            <Text>{newHighScoreMessage}</Text>
          </View>
        )}
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
  buttonText: { fontSize: 20, fontWeight: '500', color: colors.white },
});

export default CustomSummary;
