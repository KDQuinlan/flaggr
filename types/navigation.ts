import { type Levels } from '@/state/secureStoreStructure';
import { type Country } from '@/util/generateMultipleChoice/generateMultipleChoice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  index: undefined;
  difficulty: { name: string };
  multipleChoice: { name: Levels; difficulty: number; questions: Country[] };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
