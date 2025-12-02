import {
  PassportEntry,
  ProgressionStructure,
  UserSettingStructure,
} from '@/types/secureStore';
import custom from './data/games/custom';
import rapid from './data/games/rapid';
import standard from './data/games/standard';

export const defaultUserSettings: UserSettingStructure = {
  isSetUp: false,
  isGoogleConnected: false,
  isPremiumUser: false,
  locale: 'en',
  isDarkTheme: false,
  energyAmount: 10,
  lastEnergyTimestamp: null,
  displayAnswerTimerMs: 500,
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
