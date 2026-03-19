export const ACHIEVEMENTS = [
  // Quiz Achievements
  {
    id: 'totalCorrect',
    thresholds: [20, 100, 250, 1000],
  },
  {
    id: 'bestStreak',
    thresholds: [5, 10, 25, 50],
  },
  {
    id: 'passportEntries',
    thresholds: [10, 50, 100, 200],
  },

  // Progression Achievements
  {
    id: 'matchesPlayed',
    thresholds: [5, 25, 50, 100],
  },
  {
    id: 'standardProgression',
    thresholds: [2, 6, 10],
  },
  {
    id: 'standardPerfection',
    thresholds: [2, 6, 10],
  },
  {
    id: 'rapidProgression',
    thresholds: [2, 6, 10],
  },
  {
    id: 'rapidPerfection',
    thresholds: [2, 6, 10],
  },

  // Custom Achievements
  {
    id: 'customMatchesPlayed',
    thresholds: [5, 25, 50, 100],
  },
  {
    id: 'customScore',
    thresholds: [1000, 5000, 8000, 10000],
  },

  // Practice Achievements
  {
    id: 'practiceMatchesPlayed',
    thresholds: [1, 5, 15, 30],
  },
  {
    id: 'practiceFlagsImproved',
    thresholds: [10, 25, 50, 100],
  },
] as const;

export type AchievementId = (typeof ACHIEVEMENTS)[number]['id'];
export type AchievementThresholds = (typeof ACHIEVEMENTS)[number]['thresholds'];
export type AchievementStructure = (typeof ACHIEVEMENTS)[number];
