import { MS_IN_ONE_DAY } from '@/constants/common';
import stateStore from '@/state/store';

const calculateStreakOnLoad = () => {
  const { userSettings } = stateStore.getState();
  const lastExperienceGainedDate =
    userSettings.userLevel.lastExperienceGainedDate;

  if (!lastExperienceGainedDate) return 0;

  return Date.now() - lastExperienceGainedDate > MS_IN_ONE_DAY ? 0 : 1;
};

export default calculateStreakOnLoad;
