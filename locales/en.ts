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
    loading: 'Loading...',
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
      summary: '{{difficulty}} Summary',
      completed: '{{difficulty}} Completed!',
      score: 'Score',
      correct: 'Correct',
      incorrect: 'Incorrect',
      streak: 'Best Streak',
      time: 'Time',
      unlockMessage: 'You have unlocked {{userNextLevel}}',
      newHighScore: 'New High Score {{score}}{{numberSuffix}}',
      unlockRequirementMessage:
        'To unlock {{userNextLevel}}, you need a score of {{advancementRequirement}}{{numberSuffix}}',
      continue: 'Continue',
    },
    custom: {
      scoreMultiplier: '{{value}}× Score Multiplier',
      start: 'Start',
      highScoreAccordion: {
        title: 'High Score {{score}}',
        regions: 'Regions {{regions}}',
        independentCountriesOnlyEnabled: 'Independent Countries Only Enabled',
        independentCountriesOnlyDisabled: 'Independent Countries Only Disabled',
        timeLimit: 'Time Limit {{timeLimit}}',
        gameLength: 'Game Length {{gameLength}}',
        stats: 'Stats',
        correct: 'Correct {{correct}}',
        incorrect: 'Incorrect {{incorrect}}',
        bestStreak: 'Best Streak {{streak}}',
      },
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
    customSummary: {
      summary: 'Summary',
      completed: 'Completed!',
      score: 'Score',
      correct: 'Correct',
      incorrect: 'Incorrect',
      streak: 'Best Streak',
      time: 'Time',
      newHighScore: 'New High Score: {{score}}',
      continue: 'Continue',
    },
  },
} as const;

export default en;
