import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { colors } from '@/components/colors';
import DifficultySelect from '@/components/difficultySelect/difficultySelect';
import {
  RAPID_TIME_ALLOWANCE_IN_S,
  TO_PERCENTAGE_MULTIPLIER,
} from '@/constants/common';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import stateStore from '@/state/store';
import generateMultipleChoice from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import getCompletionDescription from '@/util/getCompletionDescription/getCompletionDescription';
import persistUserSettings from '@/util/persistState/persistUserSettings';

const Difficulty = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'difficulty'>>();
  const { t } = useTranslation('difficulty');
  const userProgression = stateStore((state) => state.userProgress);
  const userSettings = stateStore((s) => s.userSettings);
  const { energyAmount } = userSettings;
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);

  const { id, title } = route.params;
  const progression = userProgression.games[id];

  useEffect(() => {
    navigation.setOptions({ title: t(`titles.${title.toLowerCase()}`) });
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
            onPress={() => {
              if (energyAmount === 0) {
                setEnergyModalVisible(true);
              } else {
                navigation.navigate('multipleChoice', {
                  title: levelData.name,
                  gameMode: id,
                  questions: generateMultipleChoice(
                    levelData.id,
                    levelData.length
                  ),
                  timeLimit: id === 'rapid' ? RAPID_TIME_ALLOWANCE_IN_S : 0,
                });

                persistUserSettings({
                  ...userSettings,
                  energyAmount: energyAmount - 1,
                  lastEnergyTimestamp: Date.now(),
                });
              }
            }}
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
