import type {
  CustomCurrentData,
  ProgressionStructure,
} from '@/state/secureStoreStructure';

const setCurrentCustomGame = (
  existingProgression: ProgressionStructure,
  currentGameData: CustomCurrentData
): ProgressionStructure => {
  const {
    regions,
    independentCountriesOnly,
    timeLimit,
    gameLength,
    scoreMultiplier,
  } = currentGameData;
  return {
    ...existingProgression,
    games: {
      ...existingProgression.games,
      custom: {
        ...existingProgression.games.custom,
        currentGame: {
          regions,
          independentCountriesOnly,
          timeLimit,
          gameLength,
          scoreMultiplier,
        },
      },
    },
  };
};

export default setCurrentCustomGame;
