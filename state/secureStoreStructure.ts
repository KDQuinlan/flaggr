export type LevelData = {
  name: string;
  isCompleted: boolean;
  isInProgress: boolean;
  isLocked: boolean;
  userScore: number;
  advancementRequirement: string;
};

export type GameProgression = Record<string, LevelData>;

export type GameMode = 'standard';

export type ProgressionStructure = {
  games: {
    [key in GameMode]: GameProgression;
  };
};

export const defaultProgressionStructure: ProgressionStructure = {
  games: {
    standard: {
      levelOne: {
        name: 'Level 1',
        isCompleted: false,
        isInProgress: false,
        isLocked: false,
        userScore: 0,
        advancementRequirement: '80%',
      },
      levelTwo: {
        name: 'Level 2',
        isCompleted: false,
        isInProgress: false,
        isLocked: true,
        userScore: 0,
        advancementRequirement: '80%',
      },
      levelThree: {
        name: 'Level 3',
        isCompleted: false,
        isInProgress: false,
        isLocked: true,
        userScore: 0,
        advancementRequirement: '80%',
      },
      levelFour: {
        name: 'Level 4',
        isCompleted: false,
        isInProgress: false,
        isLocked: true,
        userScore: 0,
        advancementRequirement: '80%',
      },
      levelFive: {
        name: 'Level 5',
        isCompleted: false,
        isInProgress: false,
        isLocked: true,
        userScore: 0,
        advancementRequirement: '80%',
      },
    },
  },
};
