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

// TODO - remove scoreMultiplier and add it to state

export type RootStackParamList = {
  index: undefined;
  difficulty: { id: DifficultyScreenGameIds; title: string };
  multipleChoice: {
    title: Levels | 'Custom';
    gameMode: PlayableGameModes;
    questions: Country[];
    timeLimit: number;
  };
  summary: {
    difficulty: Levels;
    gameMode: SummaryScreenAllowedIds;
    gameResult: GameResult;
  };
  custom: undefined;
  customSummary: {
    gameResult: GameResult;
    finalScore: number;
  };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
