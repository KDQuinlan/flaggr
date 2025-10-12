import { LevelData } from '@/types/secureStore';

import { useTranslation } from 'react-i18next';

// TODO - add perfected ability for rapid

const getCompletionDescription = (levelData: LevelData): string => {
  const { t } = useTranslation('difficulty');
  const { isCompleted, isInProgress, isLocked, userScore } = levelData;

  if (isLocked) return t('states.locked');
  if (!isLocked && !isInProgress && !isCompleted) return t('states.notStarted');
  if (isInProgress) return t('states.inProgress');
  if (isCompleted && userScore === 100) return t('states.perfected');
  if (isCompleted) return t('states.completed');

  return t('states.notStarted');
};

export default getCompletionDescription;
