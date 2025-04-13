export type LevelData = {
  name: Levels;
  isCompleted: boolean;
  isInProgress: boolean;
  isLocked: boolean;
  userScore: number;
  advancementRequirement: string;
};

export type GameProgression = Record<string, LevelData>;
export type GameMode = 'standard';
export type GameRouting = 'Standard';
export type Levels = 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Level 5';

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
