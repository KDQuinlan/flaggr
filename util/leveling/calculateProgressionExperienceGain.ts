import {
  BASE_GAME_COMPLETION_XP,
  FIRST_TIME_COMPLETION_XP,
  FIRST_TIME_PERFECTION_XP,
  LEVEL_TO_FIRST_COMPLETION_PERFECTION_MAP,
  QUESTION_CORRECT_XP,
} from '@/constants/leveling';
import { Levels } from '@/types/secureStore';

interface ICalculateProgressionExperienceGainProps {
  difficultyLevel: Levels;
  correct: number;
  levelCompletedFirstTimeBonus: boolean;
  levelPerfectedFirstTimeBonus: boolean;
  allCompletedFirstTimeBonus: boolean;
  allPerfectedFirstTimeBonus: boolean;
}

const calculateProgressionExperienceGain = ({
  difficultyLevel,
  correct,
  levelCompletedFirstTimeBonus,
  levelPerfectedFirstTimeBonus,
  allCompletedFirstTimeBonus,
  allPerfectedFirstTimeBonus,
}: ICalculateProgressionExperienceGainProps): number => {
  const levelExperience =
    LEVEL_TO_FIRST_COMPLETION_PERFECTION_MAP[difficultyLevel];

  const baseXP = BASE_GAME_COMPLETION_XP + correct * QUESTION_CORRECT_XP;

  const levelBonuses =
    (levelCompletedFirstTimeBonus ? levelExperience : 0) +
    (levelPerfectedFirstTimeBonus ? levelExperience : 0);

  const globalBonuses =
    (allCompletedFirstTimeBonus ? FIRST_TIME_COMPLETION_XP : 0) +
    (allPerfectedFirstTimeBonus ? FIRST_TIME_PERFECTION_XP : 0);

  return baseXP + levelBonuses + globalBonuses;
};

export default calculateProgressionExperienceGain;
