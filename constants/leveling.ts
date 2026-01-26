import { Levels } from '@/types/secureStore';

export const BASE_GAME_COMPLETION_XP = 50;
export const QUESTION_CORRECT_XP = 5;
export const FIRST_TIME_COMPLETION_XP = 250;
export const FIRST_TIME_PERFECTION_XP = 1000;
export const FIRST_TIME_CUSTOM_FOUR_DIGITS_XP = 1000;
export const FIRST_TIME_CUSTOM_FIVE_DIGITS_XP = 5000;

export const LEVEL_TO_FIRST_COMPLETION_PERFECTION_MAP: Record<Levels, number> =
  {
    'Level 1': 10,
    'Level 2': 20,
    'Level 3': 30,
    'Level 4': 40,
    'Level 5': 50,
    'Level 6': 60,
    'Level 7': 70,
    'Level 8': 80,
    'Level 9': 90,
    'Level 10': 100,
  };
