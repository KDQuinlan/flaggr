// TODO - handle APK banner IDs and integrate into EAS JSON

import { UserAgesForPersonalisation } from '@/types/secureStore';
import { MaxAdContentRating } from 'react-native-google-mobile-ads';

export const REVENUE_CAT_API_KEY = 'goog_nXoZnLsPXVQlpCEiYlQixTGLdnH';
export const REVENUE_CAT_TEST_API_KEY = 'test_MIAKmRxfkWUBnCGQnXSmSPSeejF';

export const BANNER_HOME_AND_SETTINGS_ID =
  'ca-app-pub-5099106810383341/3413274273';
export const BANNER_DIFFICULTY_SELECT_ID =
  'ca-app-pub-5099106810383341/3612840664';
export const BANNER_MULTIPLE_CHOICE_ID =
  'ca-app-pub-5099106810383341/8398069962';
export const BANNER_PASSPORT_ID = 'ca-app-pub-5099106810383341/7360513984';
export const BANNER_TEST_ID = 'ca-app-pub-3940256099942544/9214589741';

export const REWARD_ID = 'ca-app-pub-5099106810383341/3413274273';
export const REWARD_TEST_ID = 'ca-app-pub-3940256099942544/5224354917';

export const HOME_SCREEN_BANNER_ID = 'ca-app-pub-5099106810383341/3413274273';

export const AGE_GROUP_TO_RATING: Record<
  UserAgesForPersonalisation,
  MaxAdContentRating
> = {
  1: MaxAdContentRating.G,
  12: MaxAdContentRating.G,
  13: MaxAdContentRating.PG,
  16: MaxAdContentRating.T,
  18: MaxAdContentRating.T,
};
