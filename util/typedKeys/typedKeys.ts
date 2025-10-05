/**
 * Strongly typed Object.keys() utility.
 * Returns keys of an object as a typed array instead of string[].
 *
 * Example:
 *   const obj = { a: 1, b: 2 };
 *   const keys = typedKeys(obj); // ('a' | 'b')[]
 */

const typedKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

export default typedKeys;
