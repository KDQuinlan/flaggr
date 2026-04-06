import { AchievementId } from './achievements.config';
import LevelOne from '@/assets/images/icons/resources/achievements/tier1.png';
import LevelTwo from '@/assets/images/icons/resources/achievements/tier2.png';
import LevelThree from '@/assets/images/icons/resources/achievements/tier3.png';
import LevelFour from '@/assets/images/icons/resources/achievements/tier4.png';

const achievementIconsById: Record<AchievementId, any[]> = {
  // Quiz Achievements
  totalCorrect: [LevelOne, LevelTwo, LevelThree, LevelFour],
  bestStreak: [LevelOne, LevelTwo, LevelThree, LevelFour],
  passportEntries: [LevelOne, LevelTwo, LevelThree, LevelFour],

  // Progression Achievements
  matchesPlayed: [LevelOne, LevelTwo, LevelThree, LevelFour],
  standardProgression: [LevelOne, LevelTwo, LevelThree],
  standardPerfection: [LevelOne, LevelTwo, LevelThree],
  rapidProgression: [LevelOne, LevelTwo, LevelThree],
  rapidPerfection: [LevelOne, LevelTwo, LevelThree],

  // Custom Achievements
  customMatchesPlayed: [LevelOne, LevelTwo, LevelThree, LevelFour],
  customScore: [LevelOne, LevelTwo, LevelThree, LevelFour],

  // Practice Achievements
  practiceMatchesPlayed: [LevelOne, LevelTwo, LevelThree, LevelFour],
  practiceFlagsImproved: [LevelOne, LevelTwo, LevelThree, LevelFour],
};

export default achievementIconsById;
