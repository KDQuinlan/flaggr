import { type Levels } from '@/state/secureStoreStructure';
import { type Country } from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type DifficultyScreenGameIds = 'standard' | 'rapid';
export type SummaryScreenAllowedIds = 'standard' | 'rapid';
export type PlayableGameModes = 'standard' | 'rapid' | 'custom';

export type ScreenNames =
  | 'Index'
  | 'Difficulty'
  | 'Summary'
  | 'Standard'
  | 'Rapid'
  | 'Custom';

export type GameResult = {
  correct: number;
  incorrect: number;
  highestStreak: number;
  timeTaken?: number;
};

// TODO - Extend multipleChoice to handle custom

export type RootStackParamList = {
  index: undefined;
  difficulty: { id: DifficultyScreenGameIds; title: ScreenNames };
  multipleChoice: {
    title: Levels | 'Custom';
    gameMode: PlayableGameModes;
    questions: Country[];
    timeLimit: number;
  };
  custom: undefined;
  summary: {
    difficulty: Levels;
    gameMode: SummaryScreenAllowedIds;
    gameResult: GameResult;
  };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
