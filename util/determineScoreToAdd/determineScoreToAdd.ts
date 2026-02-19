import {
  scoreByDifficultyId,
  streakMultiplierByStreakId,
} from '@/constants/lookups';
import { Difficulties, StreakTiers } from '@/types/secureStore';

const determineScoreToAdd = (
  isCorrect: boolean,
  difficulty: Difficulties,
  streak: number
) => {
  if (!isCorrect) return 0;
  let scoreToAdd;

  const questionScoreValue = scoreByDifficultyId[difficulty];
  const streakMultipler =
    streakMultiplierByStreakId[
      Math.min(Math.floor(streak / 5), 5) as StreakTiers
    ];

  scoreToAdd = questionScoreValue * streakMultipler;

  return scoreToAdd;
};

export default determineScoreToAdd;
