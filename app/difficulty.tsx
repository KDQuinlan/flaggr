import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import RouterParamList from './types';
import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import stateStore from '@/state/store';
import getCompletionDescription from '@/util/getCompletionDescription/getCompletionDescription';
import { useEffect } from 'react';
import NAME_MAP from '@/constants/nameMap';
import { NavigationProps } from '@/types/navigation';

const Difficulty = () => {
  const navigation = useNavigation<NavigationProps>();
  const userProgression = stateStore((state) => state.userProgress);
  const { name } = useLocalSearchParams<RouterParamList['difficulty']>();
  const progression = userProgression.games[NAME_MAP[name]];

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
                progressBar={levelData.userScore}
                onPress={() =>
                  navigation.navigate('multipleChoice', {
                    name: levelData.name,
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
