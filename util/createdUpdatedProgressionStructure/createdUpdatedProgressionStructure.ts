import { LEVEL_MAP } from '@/constants/mappers';
import type {
  GameMode,
  Levels,
  ProgressionStructure,
} from '@/state/secureStoreStructure';

const createUpdatedProgressionStructure = (
  existingProgression: ProgressionStructure,
  gameMode: GameMode,
  difficulty: Levels,
  isAdvancementRequirementMet: boolean,
  resultPercentage: number,
  nextDifficulty: Levels | null
): ProgressionStructure => {
  const difficultyKey = LEVEL_MAP[difficulty];
  const nextDifficultyKey = nextDifficulty ? LEVEL_MAP[nextDifficulty] : null;
  const currentLevel = existingProgression.games[gameMode][difficultyKey];

  return {
    ...existingProgression,
    games: {
      ...existingProgression.games,
      [gameMode]: {
        ...existingProgression.games[gameMode],
        [difficultyKey]: {
          ...currentLevel,
          isCompleted: true,
          userScore: Math.max(currentLevel.userScore, resultPercentage),
        },
        ...(nextDifficultyKey &&
          isAdvancementRequirementMet && {
            [nextDifficultyKey]: {
              ...existingProgression.games[gameMode][nextDifficultyKey],
              isLocked: false,
            },
          }),
      },
    },
  };
};

export default createUpdatedProgressionStructure;
