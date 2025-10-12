import { useCallback, useEffect, useMemo, useRef } from 'react';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import {
  Animated,
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { colors } from '@/components/colors';
import SummaryInfoRow from '@/components/summaryInfoRow/summaryInfoRow';
import stateStore from '@/state/store';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import persistProgression from '@/util/persistState/persistProgression';
import resetToDifficultyScreen from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import formatTime from '@/util/formatTime/formatTime';
import setBestGameData from '@/util/updatedProgressionStructure/setBestGameData';
import { ProgressionStructure } from '@/types/secureStore';

const CustomSummary = () => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'customSummary'>>();
  const { t } = useTranslation('customSummary');
  const userProgression = stateStore((state) => state.userProgress);
  const setProgression = stateStore((state) => state.setProgression);
  const { gameResult, finalScore } = route.params;
  const { correct, incorrect, highestStreak, timeTaken } = gameResult;
  const { regions, independentCountriesOnly, timeLimit, gameLength } =
    userProgression.games.custom.currentGame;

  const initialProgressionRef = useRef(userProgression);
  const progression = initialProgressionRef.current.games.custom;

  const isNewHighScore = useMemo(
    () => finalScore > progression.bestGame.score,
    [progression.bestGame.score, finalScore]
  );

  const newHighScoreMessage = isNewHighScore
    ? t('newHighScore', { score: finalScore })
    : null;

  useEffect(() => {
    navigation.setOptions({ title: t('summary') });
  }, [navigation]);

  useEffect(() => {
    if (isNewHighScore) {
      const updatedProgression: ProgressionStructure = setBestGameData(
        initialProgressionRef.current,
        {
          score: finalScore,
          regions,
          independentCountriesOnly,
          timeLimit,
          gameLength,
          correct,
          incorrect,
          streak: highestStreak,
        }
      );

      setProgression(updatedProgression);
      persistProgression(updatedProgression);
    }
  }, [finalScore, setProgression]);

  const handleContinue = () => resetToDifficultyScreen(navigation, 'custom');

  const AnimatedSummary = () => {
    const rows = [
      {
        title: t('score'),
        value: finalScore,
      },
      { title: t('correct'), value: correct },
      { title: t('incorrect'), value: incorrect },
      { title: t('streak'), value: highestStreak },
      ...(timeTaken
        ? [
            {
              title: t('time'),
              value: formatTime(timeTaken, true),
            },
          ]
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
          <Text style={styles.title}>{t('completed')}</Text>
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
            accessibilityLabel={t('continue')}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>{t('continue')}</Text>
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
