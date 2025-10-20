import { ENERGY_COOLDOWN_MS, MAXIMUM_ENERGY } from '@/constants/common';
import stateStore from '@/state/store';

const restoreEnergyOnLoad = () => {
  const { userSettings, setUserSettings } = stateStore.getState();

  if (userSettings.lastEnergyTimestamp) {
    const energyOnLoad =
      (Date.now() - userSettings.lastEnergyTimestamp) / ENERGY_COOLDOWN_MS;

    const newTimestamp =
      Date.now() - (1 - (energyOnLoad % 1)) * ENERGY_COOLDOWN_MS;
    const energyToRestore = Math.floor(energyOnLoad);
    const newEnergyAmount = Math.min(
      userSettings.energyAmount + energyToRestore,
      MAXIMUM_ENERGY
    );

    setUserSettings({
      ...userSettings,
      energyAmount: newEnergyAmount,
      lastEnergyTimestamp:
        newEnergyAmount === MAXIMUM_ENERGY ? null : newTimestamp,
    });
  }
};

export default restoreEnergyOnLoad;
