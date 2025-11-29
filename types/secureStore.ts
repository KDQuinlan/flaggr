export type Levels =
  | 'Level 1'
  | 'Level 2'
  | 'Level 3'
  | 'Level 4'
  | 'Level 5'
  | 'Level 6'
  | 'Level 7'
  | 'Level 8'
  | 'Level 9'
  | 'Level 10';
export type Difficulties = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type LevelKeys =
  | 'levelOne'
  | 'levelTwo'
  | 'levelThree'
  | 'levelFour'
  | 'levelFive'
  | 'levelSix'
  | 'levelSeven'
  | 'levelEight'
  | 'levelNine'
  | 'levelTen';

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

export type PassportEntry = {
  countryCode: string;
  countryName: string;
  continent: string;
  difficulty: number;
  correctTotal: number;
  incorrectTotal: number;
};

export type Passport = PassportEntry[];

export type ProgressionStructure = {
  games: {
    standard: GameProgression;
    rapid: GameProgression;
    custom: CustomData;
    matchesPlayed: number;
  };
  passport: Passport;
};

export type UserSettingStructure = {
  isSetUp: boolean;
  isGoogleConnected: boolean;
  isPremiumUser: boolean;
  locale: string;
  isDarkTheme: boolean;
  energyAmount: number;
  lastEnergyTimestamp: number | null;
  displayAnswerTimerMs: number;
};
