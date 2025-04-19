import countries from '../../assets/data/countries.json';

export type Country = {
  countryCode: string;
  countryName: string;
  continent: string;
  difficulty: number;
};

const generateMultipleChoice = (
  difficulty: number,
  numberOfQuestions: number
): Country[] => {
  const countriesByDifficultyInput = countries.filter(
    (c: Country) => c.difficulty === difficulty
  );

  const shuffled = countriesByDifficultyInput.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, numberOfQuestions);
};

export default generateMultipleChoice;
