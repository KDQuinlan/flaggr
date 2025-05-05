import { useNavigation } from 'expo-router';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import stateStore, { type ScreenInformation } from '@/state/store';
import getCompletionDescription from '@/util/getCompletionDescription/getCompletionDescription';
import { useEffect, useMemo } from 'react';
import { NAME_MAP } from '@/constants/mappers';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import generateMultipleChoice from '@/util/generateMultipleChoice/generateMultipleChoice';
import useScreenInformation from '@/hooks/useScreenInformation';

const Difficulty = () => {
  const navigation = useNavigation<NavigationProps>();
  const userProgression = stateStore((state) => state.userProgress);
  const route = useRoute<RouteProp<RootStackParamList, 'difficulty'>>();
  const { name } = route.params;
  const progression = userProgression.games[NAME_MAP[name]];

  const screenInformation: ScreenInformation = useMemo(
    () => ({
      screenTitle: 'Difficulty',
      gameMode: NAME_MAP[name],
      difficulty: null,
    }),
    []
  );

  useScreenInformation(screenInformation);

  useEffect(() => {
    navigation.setOptions({ title: name });
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
              <GameSelect
                title={levelData.name}
                description={getCompletionDescription(levelData)}
                progress={levelData.userScore}
                onPress={() =>
                  navigation.navigate('multipleChoice', {
                    name: levelData.name,
                    gameMode: NAME_MAP[name],
                    difficultyId: levelData.id,
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
