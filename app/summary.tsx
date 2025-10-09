import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '@/components/colors';
import SummaryInfoRow from '@/components/summaryInfoRow/summaryInfoRow';
import iconsMap from '@/assets/images/icons';
import { LEVEL_MAP } from '@/constants/mappers';
import { TO_PERCENTAGE_MULTIPLIER } from '@/constants/common';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import stateStore from '@/state/store';
import { ProgressionStructure } from '@/state/secureStoreStructure';
import createUpdatedProgressionStructure from '@/util/updatedProgressionStructure/createdUpdatedProgressionStructure';
import formatTime from '@/util/formatTime/formatTime';
import getNextLevelKey from '@/util/getNextLevelKey/getNextLevelKey';
import persistProgression from '@/util/persistProgression/persistProgression';
import resetToDifficultyScreen from '@/util/resetToDifficultyScreen/resetToDifficultyScreen';
import typedKeys from '@/util/typedKeys/typedKeys';

// TODO - use focus effect hook from expo instead?

const Summary = () => {
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
  const route = useRoute<RouteProp<RootStackParamList, 'summary'>>();
  const { t } = useTranslation('summary');
  const userProgression = stateStore((state) => state.userProgress);
  const setProgression = stateStore((state) => state.setProgression);
  const { difficulty, gameMode, gameResult } = route.params;
  const { correct, incorrect, highestStreak, timeTaken } = gameResult;
  const numberSuffix = gameMode === 'rapid' ? '' : '%';
  const translatedDifficulty = t(`levels.${LEVEL_MAP[difficulty]}`, {
    ns: 'data',
  });

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
      ? t('unlockMessage', {
          userNextLevel: t(`levels.${LEVEL_MAP[userNextLevel]}`, {
            ns: 'data',
          }),
        })
      : null;

  const scoreDisplay =
    gameMode === 'rapid' ? resultPercentage : resultPercentage.toFixed(1);

  const newHighScoreMessage = isNewHighScore
    ? t('newHighScore', {
        score: scoreDisplay,
        numberSuffix: numberSuffix,
      })
    : null;

  const unlockRequirementMessage =
    userNextLevelProgression &&
    userNextLevelProgression.isLocked &&
    !isAdvancementRequirementMet
      ? t('unlockRequirementMessage', {
          userNextLevel: t(`levels.${LEVEL_MAP[userNextLevel]}`, {
            ns: 'data',
          }),
          advancementRequirement:
            userNextLevelProgression.advancementRequirement,
          numberSuffix: numberSuffix,
        })
      : null;

  useEffect(() => {
    navigation.setOptions({
      title: t('summary', { difficulty: translatedDifficulty }),
    });
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
        title: t('score'),
        value:
          gameMode === 'rapid'
            ? resultPercentage.toString()
            : `${resultPercentage.toFixed(1)}%`,
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
          <Text style={styles.title}>
            {t('completed', { difficulty: translatedDifficulty })}
          </Text>
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
