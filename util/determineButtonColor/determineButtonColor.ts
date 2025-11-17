import { ThemeColors } from '@/components/theme';

const determineButtonColor = (
  item: string,
  userAnswer: string | null,
  correctAnswer: string,
  theme: ThemeColors
): string => {
  if (userAnswer && item !== userAnswer && item === correctAnswer)
    return theme.correct;
  if (item === userAnswer && item !== correctAnswer) return theme.incorrect;
  if (item === userAnswer && item === correctAnswer) return theme.correct;
  return theme.card;
};

export default determineButtonColor;
