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

export const LEVEL_TO_DIFFICULTY_ID_MAP: Record<Levels, number> = {
  'Level 1': 1,
  'Level 2': 2,
  'Level 3': 3,
  'Level 4': 4,
  'Level 5': 5,
};

export const LEVEL_TO_FLAG_AMOUNT_MAP: Record<Levels, number> = {
  'Level 1': LEVEL_ONE_FLAGS_AMOUNT,
  'Level 2': LEVEL_TWO_FLAGS_AMOUNT,
  'Level 3': LEVEL_THREE_FLAGS_AMOUNT,
  'Level 4': LEVEL_FOUR_FLAGS_AMOUNT,
  'Level 5': LEVEL_FIVE_FLAGS_AMOUNT,
};
