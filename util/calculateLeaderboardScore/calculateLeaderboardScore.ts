const TO_PERCENTAGE = 100;
const TO_GOOGLE_DECIMAL_FORMAT = 100;

const calculateLeaderboardScore = (correct: number, total: number): number => {
  const z = 1.96;

  const phat = correct / total;

  const numPart1 = phat + (z * z) / (2 * total);
  const insideSqrt = (phat * (1 - phat) + (z * z) / (4 * total)) / total;
  const numPart2 = z * Math.sqrt(insideSqrt);
  const denominator = 1 + (z * z) / total;

  return Math.floor(
    Number(
      ((numPart1 - numPart2) / denominator) *
        TO_PERCENTAGE *
        TO_GOOGLE_DECIMAL_FORMAT
    )
  );
};

export default calculateLeaderboardScore;
