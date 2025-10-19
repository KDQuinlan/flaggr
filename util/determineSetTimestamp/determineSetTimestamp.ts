import stateStore from '@/state/store';

const determineSetTimestamp = (): number | null => {
  const { lastEnergyTimestamp } = stateStore.getState().userSettings;

  if (!lastEnergyTimestamp) return Date.now();
  return lastEnergyTimestamp;
};

export default determineSetTimestamp;
