import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Levels, Passport, PassportEntry } from './secureStore';
import { Country } from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import { INoticeBoardEntryProps } from './noticeBoard';
import { AchievementId } from '@/data/achievements/achievements.config';

export type DifficultyScreenGameIds = 'standard' | 'rapid';
export type SummaryScreenAllowedIds = 'standard' | 'rapid';
export type PlayableGameModes = 'standard' | 'rapid' | 'custom' | 'practice';
export type MultipleChoiceScreenTitles = Levels | 'Custom' | 'Practice';
export type HomeScreenNavigableScreens =
  | 'standard'
  | 'rapid'
  | 'custom'
  | 'passport';

export type AnswerResult = 'Correct' | 'Incorrect';

export type GameResult = {
  correct: number;
  incorrect: number;
  highestStreak: number;
  history: AnswerResult[];
  timeTaken?: number | undefined;
};

export type RootStackParamList = {
  index: undefined;
  setup: undefined;
  home: undefined;
  feedback: undefined;
  settings: undefined;
  noticeBoard: undefined;
  noticeBoardEntry: { entry: INoticeBoardEntryProps };
  passport: undefined;
  passportEntry: { entry: PassportEntry };
  difficulty: { id: DifficultyScreenGameIds; title: string };
  custom: undefined;
  multipleChoice: {
    title: MultipleChoiceScreenTitles;
    gameMode: PlayableGameModes;
    questions: Country[];
    timeLimit: number;
  };
  summary: {
    difficulty: Levels;
    gameMode: SummaryScreenAllowedIds;
    gameResult: GameResult;
    multipleChoiceAchievementsUnlocked: AchievementId[];
  };
  customSummary: {
    gameResult: GameResult;
    finalScore: number;
    multipleChoiceAchievementsUnlocked: AchievementId[];
  };
  practiceSummary: {
    passportBeforeQuiz: PassportEntry[];
    gameResult: GameResult;
    multipleChoiceAchievementsUnlocked: AchievementId[];
  };
  stats: {
    title: string;
    sortedPassport: Passport;
  };
  achievementDetail: {
    achievementId: AchievementId;
  };
  credits: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
