import { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { getAnimatedXpProgressBarStyles } from './animatedXpProgressBar.styles';
import { useTheme } from '@/context/ThemeContext';
import { UserSettingStructure } from '@/types/secureStore';

interface IAnimatedXpProgress {
  initialUserLevelData: UserSettingStructure['userLevel'];
  newUserLevelData: UserSettingStructure['userLevel'];
  experienceGained: number;
}

const AnimatedXpProgress = ({
  initialUserLevelData,
  newUserLevelData,
  experienceGained,
}: IAnimatedXpProgress) => {
  const { t } = useTranslation('summary');
  const { theme } = useTheme();
  const styles = useMemo(() => getAnimatedXpProgressBarStyles(theme), [theme]);

  const progress = useSharedValue(0);
  const animatedLevel = useSharedValue(initialUserLevelData.level);
  const xpCounter = useSharedValue(0);
  const glow = useSharedValue(0);
  const levelUpOpacity = useSharedValue(0);

  const [displayLevel, setDisplayLevel] = useState(initialUserLevelData.level);

  const [showLevelUp, setShowLevelUp] = useState(false);

  const levelDifference = newUserLevelData.level - initialUserLevelData.level;

  const initialProgress = useMemo(() => {
    const currentXp =
      initialUserLevelData.currentLevelExperienceRequired -
      initialUserLevelData.experienceUntilNextLevelUp;

    return currentXp / initialUserLevelData.currentLevelExperienceRequired;
  }, [initialUserLevelData]);

  const finalProgress = useMemo(() => {
    const currentXp =
      newUserLevelData.currentLevelExperienceRequired -
      newUserLevelData.experienceUntilNextLevelUp;

    return currentXp / newUserLevelData.currentLevelExperienceRequired;
  }, [newUserLevelData]);

  useDerivedValue(() => {
    runOnJS(setDisplayLevel)(animatedLevel.value);
  });

  useEffect(() => {
    progress.value = initialProgress;

    xpCounter.value = withTiming(experienceGained, {
      duration: 1200,
    });

    if (levelDifference <= 0) {
      progress.value = withTiming(finalProgress, {
        duration: 1200,
      });
      return;
    }

    runOnJS(setShowLevelUp)(true);

    const sequence = Array.from({ length: levelDifference }).flatMap(() => [
      withTiming(1, { duration: 800 }),
      withDelay(
        200,
        withTiming(0, { duration: 0 }, () => {
          animatedLevel.value += 1;
        })
      ),
    ]);

    progress.value = withSequence(
      ...sequence,
      withTiming(finalProgress, { duration: 800 })
    );
    levelUpOpacity.value = withTiming(1, { duration: 500 });

    glow.value = withSequence(
      withTiming(1, { duration: 300 }),
      withTiming(0, { duration: 500 })
    );
  }, []);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    shadowOpacity: glow.value,
    shadowRadius: glow.value * 12,
  }));

  const levelUpStyle = useAnimatedStyle(() => ({
    opacity: levelUpOpacity.value,
    transform: [{ scale: 0.9 + levelUpOpacity.value * 0.1 }],
  }));

  return (
    <View style={styles.container}>
      {showLevelUp && (
        <Animated.Text style={[styles.levelUpText, levelUpStyle]}>
          {t('levelUp')}
        </Animated.Text>
      )}

      <View style={styles.row}>
        <Text style={styles.text}>{displayLevel}</Text>

        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>

        <Text style={styles.text}> {displayLevel + 1}</Text>
      </View>

      <Text style={styles.text}>+{experienceGained} XP</Text>
    </View>
  );
};

export default AnimatedXpProgress;
