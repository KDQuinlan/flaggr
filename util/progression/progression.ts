import { MAXIMUM_DIFFICULTY } from '@/constants/common';
import {
  GameMode,
  Levels,
  ProgressionStructure,
} from '@/state/secureStoreStructure';

const getNextLevelKey = (
  gameMode: GameMode,
  currentLevelId: number,
  progression: ProgressionStructure
): Levels | null => {
  if (currentLevelId === MAXIMUM_DIFFICULTY) return null;

  const gameProgression = progression.games[gameMode];
  const nextLevel = Object.values(gameProgression).find(
    (levelData) => levelData.id === currentLevelId + 1
  );

  return nextLevel ? nextLevel.name : null;
};

export default getNextLevelKey;
