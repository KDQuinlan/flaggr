import stateStore from '@/state/store';

import { View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

interface AdBannerProps {
  adId: string;
}

const AdBanner = ({ adId }: AdBannerProps) => {
  const canShowAds = stateStore((s) => s.canShowAds);
  const adToShow = __DEV__ ? TestIds.BANNER : adId;

  if (!canShowAds) return null;

  return (
    <View>
      <BannerAd
        unitId={adToShow}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={(error) => {
          if (error.message.includes('no-fill')) {
            console.error('Banner ad failed to load:', error);
          }
        }}
      />
    </View>
  );
};

export default AdBanner;
