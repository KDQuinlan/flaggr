import {
  defaultProgressionStructure,
  examplePassportEntry,
} from '@/state/secureStoreStructure';
import { ProgressionStructure } from '@/types/secureStore';

/**
 * deeplyNormalizes an unknown input against a default structure.
 * @param input - The unknown data from storage/API
 * @param defaultVal - The default structure to mimic
 * @param arrayItemTemplates - (Optional) A map of key names to a default object
 * to be used for normalizing items within an array.
 */
function normaliseStructure<T>(
  input: unknown,
  defaultVal: T,
  arrayItemTemplates?: Record<string, unknown>
): T {
  // 1. Safety Check: If input is null/undefined or not an object, return default.
  if (input === null || typeof input !== 'object') {
    return defaultVal;
  }

  // 2. Handle Root Arrays:
  if (Array.isArray(defaultVal)) {
    return Array.isArray(input) ? (input as unknown as T) : defaultVal;
  }

  // 3. Create container
  const output = {} as T;
  const inputObj = input as Record<string, unknown>;

  // 4. Iterate keys in default structure
  for (const key in defaultVal) {
    if (Object.prototype.hasOwnProperty.call(defaultVal, key)) {
      const defaultValue = defaultVal[key];
      const inputValue = inputObj[key];

      // If this key exists in our templates map, and both default/input are arrays,
      // we strictly normalize EVERY item in the input array against the template.
      const itemTemplate = arrayItemTemplates?.[key];

      if (
        Array.isArray(defaultValue) &&
        Array.isArray(inputValue) &&
        itemTemplate
      ) {
        // Map over the input array, recursing on every single item using the template
        output[key] = inputValue.map((item) =>
          normaliseStructure(item, itemTemplate)
        ) as unknown as T[Extract<keyof T, string>];

        continue; // Skip the rest of the loop for this key
      }

      // Case A: Key is missing in input
      if (inputValue === undefined) {
        output[key] = defaultValue;
        continue;
      }

      // Case B: Types do not match
      if (typeof inputValue !== typeof defaultValue) {
        if (Array.isArray(defaultValue) && Array.isArray(inputValue)) {
          // If we didn't have a template (handled above), we accept the array as-is
          output[key] = inputValue as unknown as T[Extract<keyof T, string>];
        } else {
          output[key] = defaultValue;
        }
        continue;
      }

      // Case C: Recursion for Nested Objects (that are not arrays)
      if (
        typeof defaultValue === 'object' &&
        defaultValue !== null &&
        !Array.isArray(defaultValue)
      ) {
        // Pass the templates down recursively (in case nested objects have arrays too)
        output[key] = normaliseStructure(
          inputValue,
          defaultValue,
          arrayItemTemplates
        );
      }
      // Case D: Primitives
      else {
        output[key] = inputValue as T[Extract<keyof T, string>];
      }
    }
  }

  return output;
}

export const sanitizeProgression = (data: unknown): ProgressionStructure => {
  return normaliseStructure<ProgressionStructure>(
    data,
    defaultProgressionStructure,
    {
      passport: examplePassportEntry,
    }
  );
};
