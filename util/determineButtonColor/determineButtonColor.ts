import { colors } from '@/components/colors';

const determineButtonColor = (
  item: string,
  userAnswer: string | null,
  correctAnswer: string
): string => {
  if (userAnswer && item !== userAnswer && item === correctAnswer)
    return 'green';
  if (item === userAnswer && item !== correctAnswer) return 'red';
  if (item === userAnswer && item === correctAnswer) return 'green';
  return colors.white;
};

export default determineButtonColor;
