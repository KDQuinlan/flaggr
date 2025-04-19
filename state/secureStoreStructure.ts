export type GameMode = 'standard';
export type GameRouting = 'Standard';
export type Levels = 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Level 5';

export type LevelData = {
  id: number;
  name: Levels;
  isCompleted: boolean;
  isInProgress: boolean;
  isLocked: boolean;
  userScore: number;
  advancementRequirement: string;
  length: number;
};

export type GameProgression = Record<string, LevelData>;

export type ProgressionStructure = {
  games: {
    [key in GameMode]: GameProgression;
  };
};

export const defaultProgressionStructure: ProgressionStructure = {
  games: {
    standard: {
      levelOne: {
        id: 1,
        name: 'Level 1',
        isCompleted: false,
        isInProgress: false,
        isLocked: false,
        userScore: 0,
        advancementRequirement: '80%',
        length: 10,
      },
      levelTwo: {
        id: 2,
        name: 'Level 2',
        isCompleted: false,
        isInProgress: false,
        isLocked: true,
        userScore: 0,
        advancementRequirement: '80%',
        length: 10,
      },
      levelThree: {
        id: 3,
        name: 'Level 3',
        isCompleted: false,
        isInProgress: false,
        isLocked: true,
        userScore: 0,
        advancementRequirement: '80%',
        length: 10,
      },
      levelFour: {
        id: 4,
        name: 'Level 4',
        isCompleted: false,
        isInProgress: false,
        isLocked: true,
        userScore: 0,
        advancementRequirement: '80%',
        length: 10,
      },
      levelFive: {
        id: 5,
        name: 'Level 5',
        isCompleted: false,
        isInProgress: false,
        isLocked: true,
        userScore: 0,
        advancementRequirement: '80%',
        length: 10,
      },
    },
  },
};
