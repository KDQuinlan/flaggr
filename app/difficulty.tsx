import { useNavigation } from 'expo-router';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '@/components/colors';
import stateStore from '@/state/store';
import getCompletionDescription from '@/util/getCompletionDescription/getCompletionDescription';
import { useEffect } from 'react';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import generateMultipleChoice from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import {
  RAPID_TIME_ALLOWANCE_IN_S,
  TO_PERCENTAGE_MULTIPLIER,
} from '@/constants/common';
import DifficultySelect from '@/components/difficultySelect/difficultySelect';

const Difficulty = () => {
  const navigation = useNavigation<NavigationProps>();
  const userProgression = stateStore((state) => state.userProgress);
  const route = useRoute<RouteProp<RootStackParamList, 'difficulty'>>();
  const { id, title } = route.params;
  const progression = userProgression.games[id];

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(progression).map(([levelKey, levelData]) => (
          <DifficultySelect
            key={levelKey}
            title={levelData.name}
            description={getCompletionDescription(levelData)}
            icon={levelKey}
            gameMode={id}
            advancementRequirement={levelData.advancementRequirement}
            progress={
              id === 'rapid'
                ? levelData.userScore / levelData.advancementRequirement
                : levelData.userScore / TO_PERCENTAGE_MULTIPLIER
            }
            score={levelData.userScore}
            onPress={() =>
              navigation.navigate('multipleChoice', {
                title: levelData.name,
                gameMode: id,
                questions: generateMultipleChoice(
                  levelData.id,
                  levelData.length
                ),
                timeLimit: id === 'rapid' ? RAPID_TIME_ALLOWANCE_IN_S : 0,
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default Difficulty;
