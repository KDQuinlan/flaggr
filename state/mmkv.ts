import { MMKV } from 'react-native-mmkv';

import { STORAGE_KEY_PROGRESSION } from '@/constants/common';

export const mmkvStorage = new MMKV({
  id: STORAGE_KEY_PROGRESSION,
});
