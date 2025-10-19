import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { usePathname } from 'expo-router';
import { Image } from 'expo-image';

import { ENERGY_COOLDOWN_MS, MAXIMUM_ENERGY } from '@/constants/common';
import stateStore from '@/state/store';
import { colors } from '../colors';
import formatTime from '@/util/formatTime/formatTime';
import persistUserSettings from '@/util/persistState/persistUserSettings';

const EnergyDisplay = () => {
  const energyModalVisible = stateStore((s) => s.energyModalVisible);
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);
  const userSettings = stateStore((s) => s.userSettings);
  const { energyAmount, lastEnergyTimestamp } = userSettings;
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const currentPathname = usePathname();

  const energyText =
    energyAmount === MAXIMUM_ENERGY
      ? energyAmount
      : `${energyAmount}/${MAXIMUM_ENERGY}`;

  useEffect(() => {
    if (energyAmount === MAXIMUM_ENERGY || !lastEnergyTimestamp) {
      setTimeLeft(null);
      return;
    }

    const startTime = new Date(lastEnergyTimestamp);
    const targetTime = new Date(startTime.getTime() + ENERGY_COOLDOWN_MS);

    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const remainingMilliseconds = targetTime.getTime() - now;

      if (remainingMilliseconds > 0) {
        const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
        setTimeLeft(formatTime(remainingSeconds));
      } else {
        setTimeLeft(null);
        clearInterval(timerInterval);
        persistUserSettings({
          ...userSettings,
          energyAmount: energyAmount + 1,
          lastEnergyTimestamp:
            energyAmount + 1 === MAXIMUM_ENERGY ? null : Date.now(),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [energyAmount, lastEnergyTimestamp]);

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
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.energyOrange,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: '600' }}>{energyText}</Text>
        </View>
      </View>

      {timeLeft && (currentPathname === '/' || currentPathname === '/home') && (
        <Text
          style={{
            position: 'absolute',
            top: '90%',
            fontWeight: '600',
            fontSize: 10,
            paddingLeft: 20,
            alignSelf: 'center',
          }}
        >
          {timeLeft}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default EnergyDisplay;
