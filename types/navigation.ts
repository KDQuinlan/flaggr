import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Levels } from './secureStore';
import { Country } from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';

export type DifficultyScreenGameIds = 'standard' | 'rapid';
export type SummaryScreenAllowedIds = 'standard' | 'rapid';
export type PlayableGameModes = 'standard' | 'rapid' | 'custom';

export type GameResult = {
  correct: number;
  incorrect: number;
  highestStreak: number;
  timeTaken?: number | undefined;
};

export type RootStackParamList = {
  index: undefined;
  setup: undefined;
  home: undefined;
  feedback: undefined;
  settings: undefined;
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
