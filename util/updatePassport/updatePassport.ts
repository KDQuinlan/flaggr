import stateStore from '@/state/store';
import { Passport, PassportEntry } from '@/types/secureStore';
import persistProgression from '../persistState/persistProgression';

const updatePassport = (
  countryCode: string,
  countryName: string,
  isCorrect: boolean
) => {
  const { userProgress } = stateStore.getState();

  const entryExists = userProgress.passport.some(
    (c: PassportEntry) => c.countryName === countryName
  );

  let newPassport: Passport = userProgress.passport;

  if (entryExists) {
    newPassport = userProgress.passport.map((entry: PassportEntry) => {
      if (entry.countryName !== countryName) return entry;

      return {
        ...entry,
        correctTotal: entry.correctTotal + (isCorrect ? 1 : 0),
        incorrectTotal: entry.incorrectTotal + (isCorrect ? 0 : 1),
      };
    });
  } else {
    if (isCorrect) {
      newPassport = [
        ...userProgress.passport,
        {
          countryCode,
          countryName,
          correctTotal: isCorrect ? 1 : 0,
          incorrectTotal: isCorrect ? 0 : 1,
        },
      ];
    }
  }

  persistProgression({
    ...userProgress,
    passport: newPassport,
  });
};

export default updatePassport;
