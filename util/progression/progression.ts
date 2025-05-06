import { MAXIMUM_DIFFICULTY } from '@/constants/common';
import { GameMode, ProgressionStructure } from '@/state/secureStoreStructure';

const getNextLevelKey = (
  gameMode: GameMode,
  currentLevelId: number,
  progression: ProgressionStructure
): string | null => {
  if (currentLevelId === MAXIMUM_DIFFICULTY) return null;

  const gameProgression = progression.games[gameMode];
  const nextLevelEntry = Object.entries(gameProgression).find(
    ([_, levelData]) => levelData.id === currentLevelId + 1
  );
  return nextLevelEntry ? nextLevelEntry[0] : null;
};

export default getNextLevelKey;
