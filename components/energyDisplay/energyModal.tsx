import { useMemo } from 'react';
import { Modal, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import stateStore from '@/state/store';
import { useRewardedAd } from '@/hooks/energyRecoveryAd/energyRecoveryAd';
import PurchasePremiumButton from '../PurchasePremiumButton/PurchasePremiumButton';
import { getEnergyModalStyles } from './energyModal.styles';
import { useTheme } from '@/context/ThemeContext';

const EnergyModal = () => {
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const energyModalVisible = stateStore((s) => s.energyModalVisible);
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);
  const { t } = useTranslation('energy');
  const { theme } = useTheme();
  const styles = useMemo(() => getEnergyModalStyles(theme), [theme]);

  const { isAdLoaded, showRewardedAd } = useRewardedAd();
  const closeModal = () => setEnergyModalVisible(false);

  const handleWatchAd = () => {
    if (isAdLoaded) {
      showRewardedAd();
    } else {
      console.warn('Ad not loaded yet.');
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={energyModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable onPress={closeModal} style={styles.modalBackdrop}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContainer}
        >
          {isInternetAvailable ? (
            <>
              <Text style={styles.titleText}>{t('title')}</Text>
              <Text style={styles.bodyText}>{t('description')}</Text>

              <Pressable
                onPress={handleWatchAd}
                disabled={!isAdLoaded}
                style={({ pressed }) => [
                  styles.ctaButton,
                  {
                    opacity: !isAdLoaded ? 0.6 : pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text style={styles.primaryButtonText}>
                  {isAdLoaded ? t('watchAd') : t('loadingAd')}
                </Text>
              </Pressable>

              <Text style={styles.bodyText}>{t('removeAd')}</Text>
              <PurchasePremiumButton />
            </>
          ) : (
            <>
              <Text style={styles.titleText}>{t('notConnectedTitle')}</Text>
              <Text style={styles.bodyText}>
                {t('notConnectedDescription')}
              </Text>
            </>
          )}
          <Pressable
            onPress={closeModal}
            style={({ pressed }) => [
              styles.closeButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={styles.closeButtonText}>{t('close')}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EnergyModal;
