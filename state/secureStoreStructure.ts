type LevelData = {
  isCompleted: boolean;
  userScore: number | null;
  advancementRequirement: string;
};

type GameProgression = Record<string, LevelData>;

export type DefaultProgressionStructure = {
  games: {
    standard: GameProgression;
  };
};

export const defaultProgressionStructure: DefaultProgressionStructure = {
  games: {
    standard: {
      levelOne: {
        isCompleted: false,
        userScore: null,
        advancementRequirement: '80%',
      },
      levelTwo: {
        isCompleted: false,
        userScore: null,
        advancementRequirement: '80%',
      },
      levelThree: {
        isCompleted: false,
        userScore: null,
        advancementRequirement: '80%',
      },
      levelFour: {
        isCompleted: false,
        userScore: null,
        advancementRequirement: '80%',
      },
      levelFive: {
        isCompleted: false,
        userScore: null,
        advancementRequirement: '80%',
      },
    },
  },
};
