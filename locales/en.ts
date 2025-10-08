const en = {
  data: {
    regions: {
      europe: 'Europe',
      asia: 'Asia',
      northamerica: 'North America',
      southamerica: 'South America',
      oceania: 'Oceania',
      africa: 'Africa',
      buttonAccessibility: 'Toggle {{option}}',
    },
  },
  screens: {
    home: {
      standard: {
        name: 'Standard',
        description: 'One flag, four choices',
      },
      rapid: {
        name: 'Rapid',
        description: 'Quick-fire flag questions',
      },
      custom: {
        name: 'Custom',
        description: 'Custom Flaggr experience',
      },
    },
    difficulty: {
      states: {
        notStarted: 'Not started',
        inProgress: 'In progress',
        locked: 'Locked',
        completed: 'Completed',
        perfected: 'Perfected',
      },
    },
    multipleChoice: {},
    summary: {
      completed: '{{difficulty}} Completed!',
      score: 'Score',
      correct: 'Correct',
      incorrect: 'Incorrect',
      streak: 'Best Streak',
      time: 'Time',
      unlockMessage: 'You have unlocked {{userNextLevel}}',
      newHighScore: '{{score}}{{numberSuffix}} is a new high score!',
      unlockRequirementMessage:
        'To unlock {{userNextLevel}}, you need a score of {{advancementRequirement}}{{numberSuffix}}',
      continue: 'Continue',
    },
    custom: {
      scoreMultiplier: '{{value}}× Score Multiplier',
      start: 'Start',
      regions: {
        title: 'Regions',
        independentCountriesOnly: 'Independent Countries Only',
      },
      gameRules: {
        title: 'Game Rules',
        timeLimit: 'Time Limit',
        timeLimitQuantity: '{{timeLimit}} Seconds ({{scoreMultiplier}}×)',
        gameLength: 'Game Length',
        gameLengthQuantity: '{{gameLength}} Questions',
        unlimited: 'Unlimited',
        gameLengthWarning:
          'No limit could result in a significant amount of questions!',
      },
    },
  },
} as const;

export default en;
