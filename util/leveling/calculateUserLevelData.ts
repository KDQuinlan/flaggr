import { UserSettingStructure } from '@/types/secureStore';

const getExperienceMultiplierForLevel = (level: number): number => {
  if (level < 10) return 1.01;
  if (level < 33) return 1.02;
  if (level < 66) return 1.03;
  if (level < 99) return 1.04;

  return 1.05;
};

interface IUpdatedLevelProps {
  level: UserSettingStructure['userLevel']['level'];
  currentLevelExperienceRequired: UserSettingStructure['userLevel']['currentLevelExperienceRequired'];
  experienceUntilNextLevelUp: UserSettingStructure['userLevel']['experienceUntilNextLevelUp'];
  experienceGained: number;
}

const updatedLevel = ({
  level,
  currentLevelExperienceRequired,
  experienceUntilNextLevelUp,
  experienceGained,
}: IUpdatedLevelProps): Omit<IUpdatedLevelProps, 'experienceGained'> => {
  let experienceToProcess = experienceGained;
  let newLevel = level;
  let newCurrentLevelExperienceRequired = currentLevelExperienceRequired;
  let newExperienceUntilNextLevelUp = experienceUntilNextLevelUp;

  while (experienceToProcess > 0) {
    if (experienceToProcess > newExperienceUntilNextLevelUp) {
      experienceToProcess -= newExperienceUntilNextLevelUp;
      newLevel++;
      newCurrentLevelExperienceRequired *=
        getExperienceMultiplierForLevel(newLevel);
      newExperienceUntilNextLevelUp = newCurrentLevelExperienceRequired;
    } else {
      newExperienceUntilNextLevelUp -= experienceToProcess;
      experienceToProcess = 0;
    }
  }

  return {
    level: newLevel,
    currentLevelExperienceRequired: newCurrentLevelExperienceRequired,
    experienceUntilNextLevelUp: newExperienceUntilNextLevelUp,
  };
};

interface ICalculateUserLevelDataProps {
  userLevel: UserSettingStructure['userLevel'];
  experienceGained: number;
}

const calculateUserLevelData = ({
  userLevel,
  experienceGained,
}: ICalculateUserLevelDataProps): UserSettingStructure['userLevel'] => {
  const {
    totalExperience,
    level,
    currentLevelExperienceRequired,
    experienceUntilNextLevelUp,
    lastExperienceGainedDate,
  } = userLevel;
  const newLastExperienceGainedDate = lastExperienceGainedDate ?? Date.now();
  const newLevelData = updatedLevel({
    level,
    currentLevelExperienceRequired,
    experienceUntilNextLevelUp,
    experienceGained,
  });

  return {
    totalExperience: totalExperience + experienceGained,
    level: newLevelData.level,
    currentLevelExperienceRequired: newLevelData.currentLevelExperienceRequired,
    experienceUntilNextLevelUp: newLevelData.experienceUntilNextLevelUp,
    lastExperienceGainedDate: newLastExperienceGainedDate,
  };
};

export default calculateUserLevelData;
