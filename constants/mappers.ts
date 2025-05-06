import { GameMode, LevelKeys, Levels } from '@/state/secureStoreStructure';
import { GameModeScreenNames } from '@/types/navigation';

export const NAME_MAP: Record<string, GameMode> = {
  Standard: 'standard',
};

export const REVERSE_NAME_MAP: Record<GameMode, GameModeScreenNames> = {
  standard: 'Standard',
};

export const LEVEL_MAP: Record<Levels, LevelKeys> = {
  'Level 1': 'levelOne',
  'Level 2': 'levelTwo',
  'Level 3': 'levelThree',
  'Level 4': 'levelFour',
  'Level 5': 'levelFive',
};

export const REVERSE_LEVEL_MAP: Record<LevelKeys, Levels> = {
  levelOne: 'Level 1',
  levelTwo: 'Level 2',
  levelThree: 'Level 3',
  levelFour: 'Level 4',
  levelFive: 'Level 5',
};
