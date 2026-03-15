import { createMMKV } from 'react-native-mmkv';

import { STORAGE_KEY_PROGRESSION } from '@/constants/common';

export const mmkvStorage = createMMKV({
  id: STORAGE_KEY_PROGRESSION,
});
