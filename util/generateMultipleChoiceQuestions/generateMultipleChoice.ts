import countries from '../../assets/data/countries.json';
import shuffleArray from '../shuffleArray/shuffleArray';

export type Country = {
  countryCode: string;
  countryName: string;
  continent: string;
  difficulty: number;
};

// TODO - Extend to handle custom i.e difficulty -> []number

const generateMultipleChoice = (
  difficulty: number,
  numberOfQuestions: number
): Country[] => {
  const countriesByDifficultyInput = countries.filter(
    (c: Country) => c.difficulty === difficulty
  );

  const shuffled = shuffleArray(countriesByDifficultyInput);

  return shuffled.slice(0, numberOfQuestions);
};

export default generateMultipleChoice;
