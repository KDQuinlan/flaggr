import { LayoutChangeEvent, View } from 'react-native';

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

interface AdBannerProps {
  adId: string;
  onLayout?: (event: LayoutChangeEvent) => void;
}

// TODO - use age-specific ad personalisation requirements

const AdBanner = ({ adId, onLayout }: AdBannerProps) => {
  const adToShow = __DEV__ ? TestIds.BANNER : adId;

  return (
    <View onLayout={onLayout}>
      <BannerAd
        unitId={adToShow}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
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
