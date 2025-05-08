import { GameMode, type Levels } from '@/state/secureStoreStructure';
import { type Country } from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type GameModeScreenNames = 'Standard' | 'Rapid';
export type GameTypeScreenNames = 'Multiple Choice';

export type ScreenNames =
  | 'Index'
  | 'Difficulty'
  | 'Summary'
  | GameModeScreenNames
  | GameTypeScreenNames;

export type GameResult = {
  correct: number;
  incorrect: number;
  highestStreak: number;
  timeTaken: number;
};

export type RootStackParamList = {
  index: undefined;
  difficulty: { name: GameModeScreenNames };
  multipleChoice: {
    difficulty: Levels;
    gameMode: GameMode;
    difficultyId: number;
    questions: Country[];
  };
  summary: { difficulty: Levels; gameMode: GameMode; gameResult: GameResult };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
