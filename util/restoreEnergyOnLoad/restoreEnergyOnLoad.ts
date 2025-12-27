import { ENERGY_COOLDOWN_MS, MAXIMUM_ENERGY } from '@/constants/common';
import stateStore from '@/state/store';
import persistUserSettings from '../persistState/persistUserSettings';

const restoreEnergyOnLoad = () => {
  const { userSettings } = stateStore.getState();

  if (userSettings.lastEnergyTimestamp) {
    const energyOnLoad =
      (Date.now() - userSettings.lastEnergyTimestamp) / ENERGY_COOLDOWN_MS;

    const newTimestamp = Date.now() - (energyOnLoad % 1) * ENERGY_COOLDOWN_MS;
    const energyToRestore = Math.floor(energyOnLoad);
    const newEnergyAmount = Math.min(
      userSettings.energyAmount + energyToRestore,
      MAXIMUM_ENERGY
    );

    persistUserSettings({
      ...userSettings,
      energyAmount: newEnergyAmount,
      lastEnergyTimestamp:
        newEnergyAmount === MAXIMUM_ENERGY ? null : newTimestamp,
    });
  }
};

export default restoreEnergyOnLoad;
