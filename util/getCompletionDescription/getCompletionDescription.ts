import { LEVELS_TO_FLAG_AMOUNT_MAP } from '@/constants/mappers';
import { LevelData } from '@/types/secureStore';

import { useTranslation } from 'react-i18next';

const getCompletionDescription = (levelData: LevelData): string => {
  const { t } = useTranslation('difficulty');
  const { isCompleted, isLocked, userScore, name } = levelData;

  const isMaxScore = userScore / LEVELS_TO_FLAG_AMOUNT_MAP[name] === 1;

  if (isLocked) return t('states.locked');
  if (!isLocked && !isCompleted) return t('states.notStarted');
  if (isCompleted && userScore === 100) return t('states.perfected');
  if (isCompleted && isMaxScore) return t('states.perfected');
  if (isCompleted) return t('states.completed');

  return t('states.notStarted');
};

export default getCompletionDescription;
