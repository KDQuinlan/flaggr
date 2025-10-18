import { Modal, View, Text, Pressable } from 'react-native';
import { colors } from '@/components/colors';
import stateStore from '@/state/store';
import { useRewardedAd } from '@/hooks/energyRecoveryAd/energyRecoveryAd';

const EnergyModal = () => {
  const energyModalVisible = stateStore((s) => s.energyModalVisible);
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);

  const closeModal = () => setEnergyModalVisible(false);

  const { isAdLoaded, showRewardedAd } = useRewardedAd();

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
      <Pressable
        onPress={closeModal}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
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
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontWeight: '700',
              fontSize: 18,
              color: colors.bluePrimary,
            }}
          >
            Out of Energy{' '}
          </Text>

          <Text
            style={{
              marginBottom: 24,
              textAlign: 'center',
              color: '#333',
              fontSize: 15,
            }}
          >
            Watch an ad to instantly restore one energy point.
          </Text>

          <Pressable
            onPress={handleWatchAd}
            disabled={!isAdLoaded}
            style={{
              backgroundColor: isAdLoaded
                ? colors.bluePrimary
                : colors.blueSecondary,
              paddingVertical: 12,
              paddingHorizontal: 28,
              borderRadius: 8,
              marginBottom: 14,
              opacity: isAdLoaded ? 1 : 0.6,
              width: '80%',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              {isAdLoaded ? 'Watch Ad' : 'Loading Ad...'}
            </Text>
          </Pressable>

          <Pressable
            onPress={closeModal}
            style={{
              backgroundColor: colors.legendaryOrange,
              paddingVertical: 10,
              paddingHorizontal: 24,
              borderRadius: 8,
              width: '60%',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>
              Close
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EnergyModal;
