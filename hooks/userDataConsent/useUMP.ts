import { useEffect, useState } from 'react';
import { MobileAds, AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';

export const useUMP = () => {
  const [isMobileAdsStartCalled, setIsMobileAdsStartCalled] = useState(false);

  useEffect(() => {
    const startAds = async () => {
      // 1. Request Consent Info
      try {
        const consentInfo = await AdsConsent.requestInfoUpdate();

        // 2. Load and show the form if required (e.g., first install, expired consent)
        if (
          consentInfo.isConsentFormAvailable &&
          consentInfo.status === AdsConsentStatus.REQUIRED
        ) {
          const { status } = await AdsConsent.loadAndShowConsentFormIfRequired();
          // Status updated, proceed to init
        }
      } catch (e) {
        console.error('UMP Error:', e);
      } finally {
        // 3. Initialize the Ads SDK regardless of consent status (the SDK handles the restrictions based on consent)
        MobileAds().initialize().then(() => {
          setIsMobileAdsStartCalled(true);
        });
      }
    };

    startAds();
  }, []);

  return isMobileAdsStartCalled;
};