import {
  defaultProgressionStructure,
  defaultUserSettings,
  examplePassportEntry,
} from '@/state/secureStoreStructure';
import {
  ProgressionStructure,
  UserSettingStructure,
} from '@/types/secureStore';

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
  if (input === null || typeof input !== 'object') {
    return defaultVal;
  }

  if (Array.isArray(defaultVal)) {
    return Array.isArray(input) ? (input as unknown as T) : defaultVal;
  }

  const output = {} as T;
  const inputObj = input as Record<string, unknown>;

  for (const key in defaultVal) {
    if (Object.prototype.hasOwnProperty.call(defaultVal, key)) {
      const defaultValue = defaultVal[key];
      const inputValue = inputObj[key];
      const itemTemplate = arrayItemTemplates?.[key];

      // 1. Array Handling (Strict Template Matching)
      if (
        Array.isArray(defaultValue) &&
        Array.isArray(inputValue) &&
        itemTemplate
      ) {
        output[key] = inputValue.map((item) =>
          normaliseStructure(item, itemTemplate)
        ) as unknown as T[Extract<keyof T, string>];
        continue;
      }

      // 2. Case A: Missing Key
      if (inputValue === undefined) {
        output[key] = defaultValue;
        continue;
      }

      // 3. Case B: Types do not match (THE NULL PATCH)
      if (typeof inputValue !== typeof defaultValue) {
        if (defaultValue === null && inputValue !== undefined) {
          output[key] = inputValue as T[Extract<keyof T, string>];
          continue;
        }

        // If default is NOT null (e.g. 5) but input IS null (typeof 'object'),
        // we fall through to the logic below, which resets it to the default (5).
        // This protects your non-nullable fields.

        if (Array.isArray(defaultValue) && Array.isArray(inputValue)) {
          output[key] = inputValue as unknown as T[Extract<keyof T, string>];
        } else {
          output[key] = defaultValue;
        }
        continue;
      }

      // 4. Case C: Recursion for Nested Objects
      if (
        typeof defaultValue === 'object' &&
        defaultValue !== null &&
        !Array.isArray(defaultValue)
      ) {
        output[key] = normaliseStructure(
          inputValue,
          defaultValue,
          arrayItemTemplates
        );
      }
      // 5. Case D: Primitives
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

export const sanitizeUserSettings = (data: unknown): UserSettingStructure => {
  return normaliseStructure<UserSettingStructure>(data, defaultUserSettings);
};
