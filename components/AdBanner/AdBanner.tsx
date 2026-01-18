import stateStore from '@/state/store';
import { useRef } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

interface AdBannerProps {
  adId: string;
  onHeightChange?: (height: number) => void;
}

// TODO - remove height callback

const AdBanner = ({ adId, onHeightChange }: AdBannerProps) => {
  const canShowAds = stateStore((s) => s.canShowAds);
  const adToShow = __DEV__ ? TestIds.BANNER : adId;

  const lastHeightRef = useRef<number | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;

    if (height !== lastHeightRef.current) {
      lastHeightRef.current = height;
      if (onHeightChange) {
        onHeightChange(height);
      }
    }
  };

  if (!canShowAds) return null;

  return (
    <View onLayout={handleLayout}>
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
