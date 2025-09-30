import { useNavigation } from 'expo-router';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import stateStore from '@/state/store';
import getCompletionDescription from '@/util/getCompletionDescription/getCompletionDescription';
import { useEffect } from 'react';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import generateMultipleChoice from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import { TO_PERCENTAGE_MULTIPLIER } from '@/constants/common';
import React from 'react';
import DifficultySelect from '@/components/difficultySelect/difficultySelect';

const Difficulty = () => {
  const navigation = useNavigation<NavigationProps>();
  const userProgression = stateStore((state) => state.userProgress);
  const route = useRoute<RouteProp<RootStackParamList, 'difficulty'>>();
  const { id } = route.params;
  const progression = userProgression.games[id];

  useEffect(() => {
    navigation.setOptions({ title: id });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <FlatList
        data={Object.entries(progression)}
        keyExtractor={([levelKey]) => levelKey}
        renderItem={({ item }) => {
          const [levelKey, levelData] = item;

          return (
            <View>
              <DifficultySelect
                title={levelData.name}
                description={getCompletionDescription(levelData)}
                // TODO - confirm gamemode id
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
                    difficulty: levelData.name,
                    gameMode: id,
                    questions: generateMultipleChoice(
                      levelData.id,
                      levelData.length
                    ),
                  })
                }
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
});

export default Difficulty;
