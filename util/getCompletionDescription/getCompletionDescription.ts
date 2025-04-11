import en from '@/locales/en';
import { LevelData } from '@/state/secureStoreStructure';

const getCompletionDescription = (levelData: LevelData) => {
  const { isCompleted, isInProgress, isLocked, userScore } = levelData;

  if (isLocked) return en.games.states.locked;
  if (!isLocked && !isInProgress && !isCompleted)
    return en.games.states.notStarted;
  if (isInProgress) return en.games.states.inProgress;
  if (isCompleted) return en.games.states.completed;
  if (isCompleted && userScore === 100) return en.games.states.perfected;
};

export default getCompletionDescription;
