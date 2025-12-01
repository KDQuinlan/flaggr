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

export const DIFFICULTY_ID_TO_LEVEL_KEYS_MAP: Record<Difficulties, LevelKeys> =
  {
    1: 'levelOne',
    2: 'levelTwo',
    3: 'levelThree',
    4: 'levelFour',
    5: 'levelFive',
    6: 'levelSix',
    7: 'levelSeven',
    8: 'levelEight',
    9: 'levelNine',
    10: 'levelTen',
  };

export const LEVELS_TO_FLAG_AMOUNT_MAP: Record<Levels, number> = {
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

// I hate that you make me do this, react native...
export const LEVELS_TO_SHADOW_ELEVATION_MAP: Record<Levels, number> = {
  'Level 1': 4,
  'Level 2': 3.3,
  'Level 3': 2.5,
  'Level 4': 2.2,
  'Level 5': 2,
  'Level 6': 1.8,
  'Level 7': 1.7,
  'Level 8': 1.5,
  'Level 9': 1.4,
  'Level 10': 1,
};

export const TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP: Record<TimeLimits, number> = {
  0: 1.0,
  15: 15.0,
  30: 12.0,
  45: 10.0,
  60: 8.5,
  75: 7.5,
  90: 7.0,
  105: 6.5,
  120: 6.0,
  135: 5.5,
  150: 5.0,
  165: 4.5,
  180: 4.0,
  195: 3.8,
  210: 3.5,
  225: 3.2,
  240: 3.0,
};

export const DIFFICULTY_TO_SCORE_MAP: Record<Difficulties, number> = {
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

export const STREAK_TIER_TO_MULTIPLIER_MAP: Record<StreakTiers, number> = {
  0: 1,
  1: 1.15,
  2: 1.18,
  3: 1.23,
  4: 1.27,
  5: 1.3,
};
