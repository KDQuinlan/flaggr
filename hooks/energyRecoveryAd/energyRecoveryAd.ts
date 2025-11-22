import { useEffect, useState } from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

import { REWARD_TEST_ID } from '@/constants/adId';
import stateStore from '@/state/store';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import { MAXIMUM_ENERGY } from '@/constants/common';

const adUnitId = __DEV__ ? TestIds.REWARDED : REWARD_TEST_ID;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export const useRewardedAd = () => {
  const { userSettings } = stateStore.getState();
  const [isAdLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setAdLoaded(true);
        console.log('Rewarded ad loaded');
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        persistUserSettings({
          ...userSettings,
          energyAmount: MAXIMUM_ENERGY,
          lastEnergyTimestamp: null,
        });
      }
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdLoaded(false);
        rewarded.load();
      }
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  const showRewardedAd = () => {
    if (isAdLoaded) {
      rewarded.show();
    } else {
      console.error('Tried to show ad, but it was not loaded.');
    }
  };

  return {
    isAdLoaded,
    showRewardedAd,
  };
};
