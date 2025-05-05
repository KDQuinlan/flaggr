import { useNavigation } from 'expo-router';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { colors } from '@/components/colors';
import { useEffect, useMemo } from 'react';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useScreenInformation from '@/hooks/useScreenInformation';
import stateStore, { ScreenInformation } from '@/state/store';
import { TO_PERCENTAGE_MULTIPLIER } from '@/constants/common';

const Summary = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'summary'>>();
  const { difficulty, gameResult } = route.params;
  const { correct, incorrect } = gameResult;

  const resultPercentage =
    (correct / (correct + incorrect)) * TO_PERCENTAGE_MULTIPLIER;

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
    value: number;
  }) => (
    <View style={styles.summaryInfoContainer}>
      <Text style={styles.infoTitle}>{title}:</Text>
      <Text style={styles.infoResult}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>You've completed {difficulty}!</Text>
        <Ionicons name="checkmark-circle" size={60} color="green" />
        <Text style={styles.subTitle}>Summary</Text>

        <SummaryInfoRow title="Correct" value={correct} />
        <SummaryInfoRow title="Incorrect" value={incorrect} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
    marginTop: '33%',
  },
  summaryContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  summaryInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  infoTitle: {},
  infoResult: {},
});

export default Summary;
