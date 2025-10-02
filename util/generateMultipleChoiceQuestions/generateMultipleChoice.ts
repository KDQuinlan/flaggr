import countries from '../../assets/data/countries.json';
import shuffleArray from '../shuffleArray/shuffleArray';

export type Country = {
  countryCode: string;
  countryName: string;
  continent: string;
  difficulty: number;
};

export type Continents =
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'South America'
  | 'North America'
  | 'Oceania';

const generateMultipleChoice = (
  difficulty: number | number[],
  numberOfQuestions: number,
  continents?: string[]
): Country[] => {
  const countriesByDifficultyAndContinent = countries.filter((c: Country) => {
    const matchesDifficulty =
      typeof difficulty === 'number'
        ? c.difficulty === difficulty
        : difficulty.includes(c.difficulty);

    const matchesContinent =
      !continents ||
      continents.length === 0 ||
      continents.includes(c.continent);

    return matchesDifficulty && matchesContinent;
  });

  const shuffled = shuffleArray(countriesByDifficultyAndContinent);
  const questions =
    numberOfQuestions === 0 ? shuffled : shuffled.slice(0, numberOfQuestions);

  return questions;
};

export default generateMultipleChoice;
