import {
  DIFFICULTY_TO_SCORE_MAP,
  STREAK_TIER_TO_MULTIPLIER_MAP,
} from '@/constants/mappers';
import { StreakTiers } from '@/types/screens';
import { Difficulties } from '@/types/secureStore';

const determineScoreToAdd = (
  isCorrect: boolean,
  difficulty: Difficulties,
  streak: number
) => {
  if (!isCorrect) return 0;
  let scoreToAdd;

  const questionScoreValue = DIFFICULTY_TO_SCORE_MAP[difficulty];
  const streakMultipler =
    STREAK_TIER_TO_MULTIPLIER_MAP[
      Math.min(Math.floor(streak / 5), 5) as StreakTiers
    ];

  scoreToAdd = questionScoreValue * streakMultipler;

  return scoreToAdd;
};

export default determineScoreToAdd;
