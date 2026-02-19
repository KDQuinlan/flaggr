import { AchievementProgressionStructure } from '@/types/secureStore';
import { ACHIEVEMENTS } from './achievements.config';

const getAchievementDefaults = (): AchievementProgressionStructure => {
  let defaultAchievements: AchievementProgressionStructure =
    {} as AchievementProgressionStructure;
  ACHIEVEMENTS.forEach((achievement) => {
    defaultAchievements[achievement.id] = {
      currentValue: 0,
      stepIndex: -1,
    };
  });

  return defaultAchievements;
};

export default getAchievementDefaults;
