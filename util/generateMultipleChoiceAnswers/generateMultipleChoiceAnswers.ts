import { MAXIMUM_DIFFICULTY, MINIMUM_DIFFICULTY } from '@/constants/common';
import countries from '@/types/countries';
import { type Country } from '../generateMultipleChoiceQuestions/generateMultipleChoice';
import shuffleArray from '../shuffleArray/shuffleArray';
import { Difficulties } from '@/types/secureStore';

const generateMultipleChoiceAnswers = (
  correctAnswer: string,
  difficulty: Difficulties,
  continent: string
) => {
  let difficultyRange: number[] = [];

  if (difficulty === MINIMUM_DIFFICULTY) {
    difficultyRange = [difficulty, difficulty + 1];
  } else if (difficulty === MAXIMUM_DIFFICULTY) {
    difficultyRange = [difficulty - 1, difficulty];
  } else {
    difficultyRange = [difficulty - 1, difficulty, difficulty + 1];
  }

  const countriesByDifficultyInput = countries
    .filter(
      (c: Country) =>
        difficultyRange.includes(c.difficulty) &&
        c.continent === continent &&
        c.countryName !== correctAnswer
    )
    .map((c: Country) => c.countryName);

  const shuffled = countriesByDifficultyInput.sort(() => Math.random() - 0.5);

  const associatedAnswers = shuffled.slice(0, 3);

  associatedAnswers.push(correctAnswer);

  return shuffleArray(associatedAnswers);
};

export default generateMultipleChoiceAnswers;
