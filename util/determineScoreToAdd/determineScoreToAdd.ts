import {
  DIFFICULTY_TO_SCORE,
  STREAK_TIER_TO_MULTIPLIER,
} from '@/constants/mappers';
import { Difficulties } from '@/types/secureStore';

const determineScoreToAdd = (
  isCorrect: boolean,
  difficulty: Difficulties,
  streak: number
) => {
  if (!isCorrect) return 0;
  let scoreToAdd;

  const questionScoreValue = DIFFICULTY_TO_SCORE[difficulty];
  const streakMultipler =
    STREAK_TIER_TO_MULTIPLIER[Math.min(Math.floor(streak / 5), 5)];

  scoreToAdd = questionScoreValue * streakMultipler;

  return scoreToAdd;
};

export default determineScoreToAdd;
