import { useNavigation } from 'expo-router';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/components/colors';
import { useEffect, useMemo } from 'react';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useScreenInformation from '@/hooks/useScreenInformation';
import stateStore, { ScreenInformation } from '@/state/store';
import { TO_PERCENTAGE_MULTIPLIER } from '@/constants/common';
import { LEVEL_MAP, REVERSE_NAME_MAP } from '@/constants/mappers';
import getNextLevelKey from '@/util/progression/progression';

const Summary = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'summary'>>();
  const userProgression = stateStore((state) => state.userProgress);
  const { difficulty, gameResult } = route.params;
  const { correct, incorrect } = gameResult;

  const currentScreenInformation = stateStore(
    (state) => state.screenInformation
  );

  const screenInformation: ScreenInformation = useMemo(
    () => ({
      screenTitle: 'Summary',
      gameMode: currentScreenInformation.gameMode,
      difficulty,
    }),
    [difficulty, currentScreenInformation.gameMode]
  );

  useScreenInformation(screenInformation);

  const resultPercentage =
    (correct / (correct + incorrect)) * TO_PERCENTAGE_MULTIPLIER;

  const progression =
    userProgression.games[screenInformation.gameMode!][LEVEL_MAP[difficulty]];

  const userNextLevel = getNextLevelKey(
    currentScreenInformation.gameMode!,
    progression.id,
    userProgression
  );

  const handleContinue = () => {
    navigation.reset({
      index: 1,
      routes: [
        { name: 'index' },
        {
          name: 'difficulty',
          params: { name: REVERSE_NAME_MAP[screenInformation.gameMode!] },
        },
      ],
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Summary - ${difficulty}`,
    });
  }, [navigation, difficulty]);

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

        <SummaryInfoRow title="Score" value={`${resultPercentage}%`} />
        <SummaryInfoRow title="Correct" value={correct} />
        <SummaryInfoRow title="Incorrect" value={incorrect} />
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={handleContinue}
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
    // flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
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
