import countries from '../../assets/data/countries.json';
import shuffleArray from '../shuffleArray/shuffleArray';

export type Country = {
  countryCode: string;
  countryName: string;
  continent: string;
  difficulty: number;
};

const generateMultipleChoice = (
  difficulty: number | number[],
  numberOfQuestions: number
): Country[] => {
  const countriesByDifficultyInput =
    typeof difficulty === 'number'
      ? countries.filter((c: Country) => c.difficulty === difficulty)
      : countries.filter((c: Country) => difficulty.includes(c.difficulty));

  const shuffled = shuffleArray(countriesByDifficultyInput);

  return shuffled.slice(0, numberOfQuestions);
};

export default generateMultipleChoice;
