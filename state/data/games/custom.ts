import { CustomData } from '@/types/secureStore';

const custom: CustomData = {
  currentGame: {
    regions: [],
    independentCountriesOnly: false,
    timeLimit: 0,
    gameLength: 0,
    scoreMultiplier: 0,
  },
  bestGame: {
    score: 0,
    regions: [],
    independentCountriesOnly: false,
    timeLimit: 0,
    gameLength: 0,
    correct: 0,
    incorrect: 0,
    streak: 0,
  },
};

export default custom;
