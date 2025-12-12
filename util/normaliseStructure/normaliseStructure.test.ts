import {
  sanitizeProgression,
  sanitizeUserSettings,
} from './normaliseStructure';
import {
  mockCorruptProgressionData,
  mockCorruptUserSettingsData,
  mockGoodProgressionData,
  mockGoodUserSettingsData,
} from './normaliseStructure.mock';

describe('normaliseStructure', () => {
  describe('Progression Structure', () => {
    it('Fixes corrupt and incorrect data with default progression', () => {
      expect(sanitizeProgression(mockCorruptProgressionData)).toEqual(
        mockGoodProgressionData
      );
    });
  });

  describe('User Settings Structure', () => {
    it('Fixes corrupt and incorrect data with default user settings', () => {
      expect(sanitizeUserSettings(mockCorruptUserSettingsData)).toEqual(
        mockGoodUserSettingsData
      );
    });
  });
});
