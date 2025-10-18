import { BANNER_TEST_ID } from '@/constants/adId';
import stateStore from '@/state/store';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import { useEffect, useState } from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
  RewardedAdReward,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : BANNER_TEST_ID;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export const useRewardedAd = () => {
  const userSettings = stateStore((s) => s.userSettings);
  const { energyAmount } = userSettings;
  const [isAdLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Event listener for when the ad is loaded and ready to show
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setAdLoaded(true);
        console.log('Rewarded ad loaded.');
      }
    );

    // Event listener for when the user has earned the reward
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward: RewardedAdReward) => {
        console.log('User earned reward!');
        // Grant the reward to the user here
      }
    );

    // Event listener for when the ad is closed
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

    // Start loading the first ad
    rewarded.load();

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  // Function to show the ad
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
