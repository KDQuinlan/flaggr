import { levelKeyByLevelName } from '@/constants/lookups';
import { LevelKeys, Levels } from '@/types/secureStore';

const determineSummaryIcons = (difficulty: Levels) => {
  const difficultyAsLevelKey = levelKeyByLevelName[difficulty];
  const tierOneLevels: LevelKeys[] = [
    'levelOne',
    'levelTwo',
    'levelThree',
    'levelFour',
    'levelFive',
  ];
  const tierTwoLevels: LevelKeys[] = [
    'levelSix',
    'levelSeven',
    'levelEight',
    'levelNine',
    'levelTen',
  ];
  const tierOneToTwoProgressionLevels: LevelKeys[] = [
    'levelTwo',
    'levelThree',
    'levelFour',
    'levelFive',
    'levelSix',
  ];

  if (difficultyAsLevelKey === 'levelFive')
    return tierOneToTwoProgressionLevels;
  if (tierOneLevels.includes(difficultyAsLevelKey)) return tierOneLevels;

  return tierTwoLevels;
};

export default determineSummaryIcons;
