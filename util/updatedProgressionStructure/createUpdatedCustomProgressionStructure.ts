import type { ProgressionStructure } from '@/state/secureStoreStructure';

const createUpdatedCustomProgressionStructure = (
  existingProgression: ProgressionStructure,
  resultPercentage: number
): ProgressionStructure => {
  return {
    ...existingProgression,
    games: {
      ...existingProgression.games,
      custom: {
        highScore: resultPercentage,
      },
    },
  };
};

export default createUpdatedCustomProgressionStructure;
