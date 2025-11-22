import { useEffect, useMemo, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { usePathname } from 'expo-router';
import { Image } from 'expo-image';

import { ENERGY_COOLDOWN_MS, MAXIMUM_ENERGY } from '@/constants/common';
import stateStore from '@/state/store';
import formatTime from '@/util/formatTime/formatTime';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import { getEnergyDisplayStyles } from './energyDisplay.styles';
import { useTheme } from '@/context/ThemeContext';

const EnergyDisplay = () => {
  const energyModalVisible = stateStore((s) => s.energyModalVisible);
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);
  const userSettings = stateStore((s) => s.userSettings);
  const { energyAmount, lastEnergyTimestamp } = userSettings;
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const { theme } = useTheme();
  const styles = useMemo(() => getEnergyDisplayStyles(theme), [theme]);
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
    <Pressable
      onPress={() => setEnergyModalVisible(!energyModalVisible)}
      hitSlop={10}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={styles.parentContainer}>
        <Image
          source={require('@/assets/images/icons/resources/energy.png')}
          style={styles.image}
        />
        <View style={styles.energyContainer}>
          <Text style={styles.energy}>{energyText}</Text>
        </View>
      </View>

      {timeLeft && (currentPathname === '/' || currentPathname === '/home') && (
        <Text style={styles.timer}>{timeLeft}</Text>
      )}
    </Pressable>
  );
};

export default EnergyDisplay;
