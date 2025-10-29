import { LEVEL_MAP } from '@/constants/mappers';
import { LevelKeys, Levels } from '@/types/secureStore';

const determineSummaryIcons = (difficulty: Levels) => {
  const difficultyAsLevelKey = LEVEL_MAP[difficulty];
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
