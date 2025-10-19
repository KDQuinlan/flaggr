import { Modal, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '@/components/colors';
import stateStore from '@/state/store';
import { useRewardedAd } from '@/hooks/energyRecoveryAd/energyRecoveryAd';

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
              styles.primaryButton,
              {
                opacity: !isAdLoaded ? 0.6 : pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isAdLoaded ? t('watchAd') : t('loadingAd')}
            </Text>
          </Pressable>

          <Pressable
            onPress={closeModal}
            style={({ pressed }) => [
              styles.secondaryButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={styles.secondaryButtonText}>{t('close')}</Text>
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
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: colors.legendaryOrange,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginBottom: 14,
    width: '80%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: colors.bluePrimary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default EnergyModal;
