import stateStore from '@/state/store';
import { AchievementId, ACHIEVEMENTS } from './achievements.config';
import { AchievementProgressionStructure } from '@/types/secureStore';

interface IEmitAchievementEvent {
  id: AchievementId;
  value: number;
}

const emitAchievementEvent = ({
  id,
  value,
}: IEmitAchievementEvent): {
  updatedAchievementProgress: AchievementProgressionStructure[AchievementId];
  hasUpdated: boolean;
} => {
  const { userProgress } = stateStore.getState();
  const achievementProgress = userProgress.achievements[id];
  const userIndex = achievementProgress.stepIndex;
  const unlockedTimestamps = achievementProgress.unlockedTimestamps;

  const achievementInformation = ACHIEVEMENTS.find(
    (achievement) => achievement.id === id
  )!;

  let newIndex = userIndex;
  let newUnlockedTimestamps = unlockedTimestamps;

  while (
    newIndex + 1 < achievementInformation.thresholds.length &&
    value >= achievementInformation.thresholds[newIndex + 1]!
  ) {
    newIndex++;
    newUnlockedTimestamps.push(new Date().toISOString());
  }

  return {
    updatedAchievementProgress: {
      ...achievementProgress,
      currentValue: value,
      stepIndex: newIndex,
    },
    hasUpdated: newIndex > userIndex,
  };
};

export default emitAchievementEvent;
