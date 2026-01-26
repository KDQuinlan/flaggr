import {
  BASE_GAME_COMPLETION_XP,
  QUESTION_CORRECT_XP,
} from '@/constants/leveling';

interface ICalculateExperienceGainProps {
  correct: number;
}

const calculateExperienceGain = ({
  correct,
}: ICalculateExperienceGainProps): number => {
  const baseXP = BASE_GAME_COMPLETION_XP + correct * QUESTION_CORRECT_XP;

  return baseXP;
};

export default calculateExperienceGain;
