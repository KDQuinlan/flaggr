import { defaultUserSettings } from '@/state/secureStoreStructure';
import stateStore from '@/state/store';
import restoreEnergyOnLoad from './restoreEnergyOnLoad';
import persistUserSettings from '../persistState/persistUserSettings';

jest.mock('@/util/persistState/persistUserSettings', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('restoreEnergyOnLoad', () => {
  // 00:25 on 01-01-2025
  jest.spyOn(Date, 'now').mockImplementation(() => 1735691100000);

  beforeEach(() => {
    stateStore.setState({
      userSettings: {
        ...defaultUserSettings,
        // 00:00 on 01-01-2025
        lastEnergyTimestamp: 1735689600000,
        energyAmount: 5,
      },
    });

    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Restores 2 energy with 5 minutes until the next after 25 minutes', () => {
    restoreEnergyOnLoad();

    expect(persistUserSettings).toHaveBeenCalledWith({
      ...defaultUserSettings,
      energyAmount: 7,
      lastEnergyTimestamp: 1735690800000,
    });
  });
});
