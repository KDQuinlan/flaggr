import en from '@/locales/en';
import { LevelData } from '@/state/secureStoreStructure';

// TODO - do we need 'perfected' here?

const getCompletionDescription = (levelData: LevelData): string => {
  const { isCompleted, isInProgress, isLocked, userScore } = levelData;

  if (isLocked) return en.screens.difficulty.states.locked;
  if (!isLocked && !isInProgress && !isCompleted)
    return en.screens.difficulty.states.notStarted;
  if (isInProgress) return en.screens.difficulty.states.inProgress;
  if (isCompleted) return en.screens.difficulty.states.completed;
  if (isCompleted && userScore === 100)
    return en.screens.difficulty.states.perfected;

  return en.screens.difficulty.states.notStarted;
};

export default getCompletionDescription;
