export type Levels = 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Level 5';
export type Difficulties = 1 | 2 | 3 | 4 | 5;
export type LevelKeys =
  | 'levelOne'
  | 'levelTwo'
  | 'levelThree'
  | 'levelFour'
  | 'levelFive';

export type LevelData = {
  id: Difficulties;
  name: Levels;
  isCompleted: boolean;
  isInProgress: boolean;
  isLocked: boolean;
  userScore: number;
  advancementRequirement: number;
  length: number;
};

export type CustomCurrentData = {
  regions: string[];
  independentCountriesOnly: boolean;
  timeLimit: number;
  gameLength: number;
  scoreMultiplier: number;
};

export type CustomBestData = {
  score: number;
  regions: string[];
  independentCountriesOnly: boolean;
  timeLimit: number;
  gameLength: number;
  correct: number;
  incorrect: number;
  streak: number;
};

export type CustomData = {
  currentGame: CustomCurrentData;
  bestGame: CustomBestData;
};

export type GameProgression = Record<LevelKeys, LevelData>;

export type ProgressionStructure = {
  games: {
    standard: GameProgression;
    rapid: GameProgression;
    custom: CustomData;
  };
};

export type UserSettingStructure = {
  isSetUp: boolean;
  locale: string;
  energyAmount: number;
  lastEnergyTimestamp: number | null;
  displayAnswerTimerMs: number;
};
