import { useTheme } from '@/context/ThemeContext';

// TODO - find red and green and add to palette

const determineButtonColor = (
  item: string,
  userAnswer: string | null,
  correctAnswer: string
): string => {
  const { theme } = useTheme();

  if (userAnswer && item !== userAnswer && item === correctAnswer)
    return 'green';
  if (item === userAnswer && item !== correctAnswer) return 'red';
  if (item === userAnswer && item === correctAnswer) return 'green';
  return theme.card;
};

export default determineButtonColor;
