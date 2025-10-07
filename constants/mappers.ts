import { LevelKeys, Levels } from '@/state/secureStoreStructure';
import {
  LEVEL_FIVE_FLAGS_AMOUNT,
  LEVEL_FOUR_FLAGS_AMOUNT,
  LEVEL_ONE_FLAGS_AMOUNT,
  LEVEL_THREE_FLAGS_AMOUNT,
  LEVEL_TWO_FLAGS_AMOUNT,
} from './common';

export const LEVEL_MAP: Record<Levels, LevelKeys> = {
  'Level 1': 'levelOne',
  'Level 2': 'levelTwo',
  'Level 3': 'levelThree',
  'Level 4': 'levelFour',
  'Level 5': 'levelFive',
};

export const DIFFICULTY_ID_TO_LEVEL_MAP: Record<number, Levels> = {
  1: 'Level 1',
  2: 'Level 2',
  3: 'Level 3',
  4: 'Level 4',
  5: 'Level 5',
};

export const LEVEL_TO_FLAG_AMOUNT_MAP: Record<Levels, number> = {
  'Level 1': LEVEL_ONE_FLAGS_AMOUNT,
  'Level 2': LEVEL_TWO_FLAGS_AMOUNT,
  'Level 3': LEVEL_THREE_FLAGS_AMOUNT,
  'Level 4': LEVEL_FOUR_FLAGS_AMOUNT,
  'Level 5': LEVEL_FIVE_FLAGS_AMOUNT,
};

export const TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP: Record<number, number> = {
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

export const DIFFICULTY_TO_SCORE: Record<number, number> = {
  1: 10,
  2: 12,
  3: 15,
  4: 19,
  5: 24,
};

export const STREAK_TIER_TO_MULTIPLIER: Record<number, number> = {
  0: 1,
  1: 1.05,
  2: 1.1,
  3: 1.15,
  4: 1.2,
  5: 1.25,
};
