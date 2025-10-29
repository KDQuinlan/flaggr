import { Difficulties, LevelKeys, Levels } from '@/types/secureStore';
import {
  LEVEL_EIGHT_FLAGS_AMOUNT,
  LEVEL_FIVE_FLAGS_AMOUNT,
  LEVEL_FOUR_FLAGS_AMOUNT,
  LEVEL_NINE_FLAGS_AMOUNT,
  LEVEL_ONE_FLAGS_AMOUNT,
  LEVEL_SEVEN_FLAGS_AMOUNT,
  LEVEL_SIX_FLAGS_AMOUNT,
  LEVEL_TEN_FLAGS_AMOUNT,
  LEVEL_THREE_FLAGS_AMOUNT,
  LEVEL_TWO_FLAGS_AMOUNT,
} from './common';
import { StreakTiers, TimeLimits } from '@/types/screens';

export const LEVEL_MAP: Record<Levels, LevelKeys> = {
  'Level 1': 'levelOne',
  'Level 2': 'levelTwo',
  'Level 3': 'levelThree',
  'Level 4': 'levelFour',
  'Level 5': 'levelFive',
  'Level 6': 'levelSix',
  'Level 7': 'levelSeven',
  'Level 8': 'levelEight',
  'Level 9': 'levelNine',
  'Level 10': 'levelTen',
};

export const DIFFICULTY_ID_TO_LEVEL_MAP: Record<Difficulties, Levels> = {
  1: 'Level 1',
  2: 'Level 2',
  3: 'Level 3',
  4: 'Level 4',
  5: 'Level 5',
  6: 'Level 6',
  7: 'Level 7',
  8: 'Level 8',
  9: 'Level 9',
  10: 'Level 10',
};

export const LEVEL_TO_FLAG_AMOUNT_MAP: Record<Levels, number> = {
  'Level 1': LEVEL_ONE_FLAGS_AMOUNT,
  'Level 2': LEVEL_TWO_FLAGS_AMOUNT,
  'Level 3': LEVEL_THREE_FLAGS_AMOUNT,
  'Level 4': LEVEL_FOUR_FLAGS_AMOUNT,
  'Level 5': LEVEL_FIVE_FLAGS_AMOUNT,
  'Level 6': LEVEL_SIX_FLAGS_AMOUNT,
  'Level 7': LEVEL_SEVEN_FLAGS_AMOUNT,
  'Level 8': LEVEL_EIGHT_FLAGS_AMOUNT,
  'Level 9': LEVEL_NINE_FLAGS_AMOUNT,
  'Level 10': LEVEL_TEN_FLAGS_AMOUNT,
};

export const TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP: Record<TimeLimits, number> = {
  0: 0.0,
  15: 1.3,
  30: 1.25,
  45: 1.2,
  60: 1.15,
  75: 1.1,
  90: 1.08,
  105: 1.06,
  120: 1.05,
  135: 1.04,
  150: 1.03,
  165: 1.02,
  180: 1.01,
  195: 1.0,
  210: 1.0,
  225: 1.0,
  240: 1.0,
};

export const DIFFICULTY_TO_SCORE: Record<Difficulties, number> = {
  1: 10,
  2: 12,
  3: 14,
  4: 16,
  5: 18,
  6: 20,
  7: 22,
  8: 24,
  9: 26,
  10: 28,
};

export const STREAK_TIER_TO_MULTIPLIER: Record<StreakTiers, number> = {
  0: 1,
  1: 1.05,
  2: 1.1,
  3: 1.15,
  4: 1.2,
  5: 1.25,
};
