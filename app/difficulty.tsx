import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { RouterParamList } from './types';
import { colors } from '@/components/colors';
import GameSelect from '@/components/gameSelect/gameSelect';
import stateStore from '@/state/store';
import getCompletionDescription from '@/util/getCompletionDescription/getCompletionDescription';

const Games = () => {
  const userProgression = stateStore((state) => state.userProgress);
  const { name } = useLocalSearchParams<RouterParamList['difficulty']>();
  const progression = userProgression.games[name];

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

export default Games;
