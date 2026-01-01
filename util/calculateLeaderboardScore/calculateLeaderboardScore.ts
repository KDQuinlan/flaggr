// TODO - add google leaderboard *100 (to decimal) multiplier

const calculateLeaderboardScore = (correct: number, total: number): number => {
  const z = 1.96;

  const phat = correct / total;

  const numPart1 = phat + (z * z) / (2 * total);
  const insideSqrt = (phat * (1 - phat) + (z * z) / (4 * total)) / total;
  const numPart2 = z * Math.sqrt(insideSqrt);
  const denominator = 1 + (z * z) / total;

  return Number((((numPart1 - numPart2) / denominator) * 100).toFixed(2));
};

export default calculateLeaderboardScore;
