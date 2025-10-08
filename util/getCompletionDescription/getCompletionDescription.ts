import { useTranslation } from 'react-i18next';

import { LevelData } from '@/state/secureStoreStructure';

// TODO - do we need 'perfected' here?

const getCompletionDescription = (levelData: LevelData): string => {
  const { t } = useTranslation('difficulty');
  const { isCompleted, isInProgress, isLocked, userScore } = levelData;

  if (isLocked) return t('states.locked');
  if (!isLocked && !isInProgress && !isCompleted) return t('states.notStarted');
  if (isInProgress) return t('states.inProgress');
  if (isCompleted) return t('states.completed');
  if (isCompleted && userScore === 100) return t('states.perfected');

  return t('states.notStarted');
};

export default getCompletionDescription;
