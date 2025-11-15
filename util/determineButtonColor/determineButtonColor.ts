import { ThemeColors } from '@/components/theme';

const determineButtonColor = (
  item: string,
  userAnswer: string | null,
  correctAnswer: string,
  theme: ThemeColors
): string => {
  if (userAnswer && item !== userAnswer && item === correctAnswer)
    return theme.correctText;
  if (item === userAnswer && item !== correctAnswer) return theme.incorrectText;
  if (item === userAnswer && item === correctAnswer) return theme.correctText;
  return theme.card;
};

export default determineButtonColor;
