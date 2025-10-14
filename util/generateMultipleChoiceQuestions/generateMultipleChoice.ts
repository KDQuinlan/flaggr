import { NON_INDEPENDENT_COUNTRY_CODES } from '@/constants/common';
import countries from '@/types/countries';
import shuffleArray from '../shuffleArray/shuffleArray';
import { Difficulties } from '@/types/secureStore';

export type Country = {
  countryCode: string;
  countryName: string;
  continent: string;
  difficulty: Difficulties;
};

export type Continents =
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'South America'
  | 'North America'
  | 'Oceania';

const generateMultipleChoice = (
  difficulty: Difficulties | Difficulties[],
  numberOfQuestions: number,
  continents?: string[],
  independentOnly?: boolean
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

    const matchesIndependent =
      !independentOnly ||
      !NON_INDEPENDENT_COUNTRY_CODES.includes(c.countryCode);

    return matchesDifficulty && matchesContinent && matchesIndependent;
  });

  const shuffled = shuffleArray(countriesByDifficultyAndContinent);
  const questions =
    numberOfQuestions === 0 ? shuffled : shuffled.slice(0, numberOfQuestions);

  return questions;
};

export default generateMultipleChoice;
