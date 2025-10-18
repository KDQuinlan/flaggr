import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

interface AdBannerProps {
  adId: string;
}

// TODO - use age-specific ad personalisation requirements

const AdBanner = ({ adId }: AdBannerProps) => {
  const adToShow = __DEV__ ? TestIds.BANNER : adId;

  return (
    <BannerAd
      unitId={adToShow}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={(error) => {
        if (error.message.includes('no-fill')) {
          return;
        }
        console.error('Banner ad failed to load:', error);
      }}
    />
  );
};

export default AdBanner;
