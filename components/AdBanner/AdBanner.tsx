import { useEffect } from 'react';
import MobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const AdBanner = () => {
    const adUnitId = TestIds.BANNER;

    useEffect(() => {
    MobileAds().initialize();
  }, []);

  return (
    <BannerAd
      unitId={adUnitId}
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