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

const adUnitId = __DEV__ ? TestIds.REWARDED : REWARD_TEST_ID;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export const useRewardedAd = () => {
  const userSettings = stateStore((s) => s.userSettings);
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
      () => console.log('User earned reward')
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        persistUserSettings({
          ...userSettings,
          energyAmount: 10,
          lastEnergyTimestamp: null,
        });
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
