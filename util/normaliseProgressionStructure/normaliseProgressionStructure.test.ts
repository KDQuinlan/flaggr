import { sanitizeProgression } from './normaliseProgressionStructure';
import {
  mockCorruptData,
  mockGoodData,
} from './normaliseProgressionStructure.mock';

describe('normaliseProgressionStructure', () => {
  it('Fixes corrupt and incorrect data with defaults', () => {
    expect(sanitizeProgression(mockCorruptData)).toEqual(mockGoodData);
  });
});
