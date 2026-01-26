import { Difficulties } from '@/types/secureStore';

export const APP_NAME = 'Flaggr';
export const STORAGE_KEY_PROGRESSION = 'flaggr-progression';
export const STORAGE_KEY_SETTINGS = 'flaggr-settings';
export const SUPPORTED_LANGUAGES = ['en', 'es'];
export const VERSION_KEY = 1;

export const MS_IN_ONE_DAY = 60 * 60 * 24 * 1000;

export const MAXIMUM_ENERGY = 10;
export const ENERGY_COOLDOWN_MS = 10 * 60 * 1000;
export const MINIMUM_DIFFICULTY = 1;
export const MAXIMUM_DIFFICULTY = 10;
export const GAME_DIFFICULTIES: Difficulties[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

export const MINIMUM_CUSTOM_TIME_LIMIT_SECONDS = 0;
export const MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS = 240;
export const MINIMUM_GAME_LENGTH = 0;
export const MAXIMUM_GAME_LENGTH = 30;
export const DEFAULT_GAME_LENGTH = 10;
export const DEFAULT_SCORE_MULTIPLIER = 1;
export const INDEPENDENT_COUNTRIES_PENALTY = 0.9;

export const TO_PERCENTAGE_MULTIPLIER = 100;
export const ANSWER_LETTERS = ['A.', 'B.', 'C.', 'D.'];
export const RAPID_TIME_ALLOWANCE_IN_S = 60;

export const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Nederlands', value: 'nl' },
  { label: 'Українська', value: 'uk' },
  { label: 'Italiano', value: 'it' },
  { label: 'Magyar', value: 'hu' },
];

export const MONTHS_FOR_LOCALISATION = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export const LEVEL_ONE_FLAGS_AMOUNT = 19;
export const LEVEL_TWO_FLAGS_AMOUNT = 18;
export const LEVEL_THREE_FLAGS_AMOUNT = 23;
export const LEVEL_FOUR_FLAGS_AMOUNT = 30;
export const LEVEL_FIVE_FLAGS_AMOUNT = 42;
export const LEVEL_SIX_FLAGS_AMOUNT = 25;
export const LEVEL_SEVEN_FLAGS_AMOUNT = 26;
export const LEVEL_EIGHT_FLAGS_AMOUNT = 19;
export const LEVEL_NINE_FLAGS_AMOUNT = 20;
export const LEVEL_TEN_FLAGS_AMOUNT = 24;

export const VALID_REGIONS = [
  'Europe',
  'Asia',
  'North America',
  'South America',
  'Oceania',
  'Africa',
];

export const NON_INDEPENDENT_COUNTRY_CODES = [
  'AI',
  'AQ',
  'AS',
  'AW',
  'AX',
  'BL',
  'BM',
  'BQ',
  'BV',
  'CC',
  'CK',
  'CW',
  'CX',
  'EH',
  'FK',
  'FO',
  'GB-ENG',
  'GB-NIR',
  'GB-SCT',
  'GB-WLS',
  'GF',
  'GG',
  'GI',
  'GL',
  'GP',
  'GS',
  'GU',
  'HK',
  'HM',
  'IM',
  'IO',
  'JE',
  'KY',
  'MF',
  'MO',
  'MP',
  'MQ',
  'MS',
  'NC',
  'NF',
  'NU',
  'PF',
  'PM',
  'PN',
  'PR',
  'PS',
  'RE',
  'SH',
  'SJ',
  'SX',
  'TC',
  'TF',
  'TK',
  'UM',
  'VG',
  'VI',
  'WF',
  'YT',
];
