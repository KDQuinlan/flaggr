import { MAXIMUM_ENERGY } from '@/constants/common';
import stateStore from '@/state/store';
import { Image } from 'expo-image';
import { TouchableOpacity, Text, View } from 'react-native';
import { colors } from '../colors';

const EnergyDisplay = () => {
  const energyModalVisible = stateStore((s) => s.energyModalVisible);
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);
  const userSettings = stateStore((s) => s.userSettings);
  const { energyAmount, lastEnergyTimestamp } = userSettings;

  const energyText =
    energyAmount === MAXIMUM_ENERGY
      ? energyAmount
      : `${energyAmount}/${MAXIMUM_ENERGY}`;

  return (
    <TouchableOpacity
      onPress={() => setEnergyModalVisible(!energyModalVisible)}
      hitSlop={10}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('@/assets/images/icons/resources/energy.png')}
          style={{
            width: 20,
            height: 30,
            left: 10,
            zIndex: 1,
          }}
        />
        <View
          style={{
            minWidth: 50,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.energyOrange,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: '600' }}>{energyText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EnergyDisplay;
