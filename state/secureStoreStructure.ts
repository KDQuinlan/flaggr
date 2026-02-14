import {
  PassportEntry,
  ProgressionStructure,
  UserSettingStructure,
} from '@/types/secureStore';
import custom from './data/games/custom';
import rapid from './data/games/rapid';
import standard from './data/games/standard';
import { ANSWERS_SHOWN_DURATION_DEFAULT_MS } from '@/constants/settings';
import { MAXIMUM_ENERGY } from '@/constants/common';

// TODO - before going live, add version code to to each default object for migration handling

export const defaultUserSettings: UserSettingStructure = {
  isSetUp: false,
  isGoogleConnected: false,
  userDisplayName: '',
  userAgeForPersonalisation: null,
  isPremiumUser: false,
  locale: 'en',
  isDarkTheme: false,
  energyAmount: MAXIMUM_ENERGY,
  lastEnergyTimestamp: null,
  noticeBoardLastVisitedDate: null,
  displayAnswerTimerMs: ANSWERS_SHOWN_DURATION_DEFAULT_MS,
  userLevel: {
    totalExperience: 0,
    level: 1,
    currentLevelExperienceRequired: 200,
    experienceUntilNextLevelUp: 200,
    lastExperienceGainedDate: null,
  },
};

export const defaultProgressionStructure: ProgressionStructure = {
  games: {
    standard,
    rapid,
    custom,
    matchesPlayed: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
  },
  passport: [],
};

export const examplePassportEntry: PassportEntry = {
  countryCode: '',
  countryName: '',
  continent: '',
  difficulty: 1,
  correctTotal: 0,
  incorrectTotal: 0,
};
