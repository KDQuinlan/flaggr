import { LEVEL_MAP } from '@/constants/mappers';
import {
  ProgressionStructure,
  type Levels,
} from '@/state/secureStoreStructure';
import { SummaryScreenAllowedIds } from '@/types/navigation';
import { useRef } from 'react';
import getNextLevelKey from '../getNextLevelKey/getNextLevelKey';

const determineUserProgression = (
  gameMode: 'custom' | SummaryScreenAllowedIds,
  difficulty: 'Custom' | Levels,
  resultPercentage: number,
  userProgression: ProgressionStructure
) => {
  if (difficulty !== 'Custom' && gameMode !== 'custom') {
    const progression = userProgression.games[gameMode][LEVEL_MAP[difficulty]];
    const initialProgressionRef = useRef(userProgression);
    const isAdvancementRequirementMet =
      resultPercentage >= progression.advancementRequirement;

    const userNextLevel = getNextLevelKey(
      gameMode,
      progression.id,
      userProgression
    );

    const userNextLevelProgression =
      userNextLevel &&
      userProgression.games[gameMode][LEVEL_MAP[userNextLevel]];
  } else {
    // Add custom
  }
};

export default determineUserProgression;
