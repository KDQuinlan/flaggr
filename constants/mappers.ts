import { GameMode, LevelKeys, Levels } from '@/state/secureStoreStructure';
import { GameModeScreenNames } from '@/types/navigation';

export const NAME_MAP: Record<GameModeScreenNames, GameMode> = {
  Standard: 'standard',
  Rapid: 'rapid',
};

export const REVERSE_NAME_MAP: Record<GameMode, GameModeScreenNames> = {
  standard: 'Standard',
  rapid: 'Rapid',
};

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
