import { CustomBestData, ProgressionStructure } from '@/types/secureStore';

const setBestGameData = (
  existingProgression: ProgressionStructure,
  currentGameData: CustomBestData
): ProgressionStructure => {
  const {
    score,
    regions,
    independentCountriesOnly,
    timeLimit,
    gameLength,
    correct,
    incorrect,
    streak,
  } = currentGameData;
  return {
    ...existingProgression,
    games: {
      ...existingProgression.games,
      custom: {
        ...existingProgression.games.custom,
        bestGame: {
          score,
          regions,
          independentCountriesOnly,
          timeLimit,
          gameLength,
          correct,
          incorrect,
          streak,
        },
      },
    },
  };
};

export default setBestGameData;
