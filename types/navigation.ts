import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  index: undefined;
  difficulty: { name: string };
  multipleChoice: { name: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
