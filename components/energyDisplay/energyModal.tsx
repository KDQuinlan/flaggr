import { Modal, Text, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '@/components/colors';
import stateStore from '@/state/store';
import { useRewardedAd } from '@/hooks/energyRecoveryAd/energyRecoveryAd';
import PurchasePremiumButton from '../PurchasePremiumButton/PurchasePremiumButton';

const EnergyModal = () => {
  const energyModalVisible = stateStore((s) => s.energyModalVisible);
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);
  const { t } = useTranslation('energy');

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

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  titleText: {
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 18,
    color: colors.bluePrimary,
  },
  bodyText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    fontSize: 15,
  },
  ctaButton: {
    backgroundColor: colors.bluePrimary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    maxWidth: 240,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: colors.bluePrimary,
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default EnergyModal;
