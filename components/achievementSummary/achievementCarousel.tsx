import { Text, Dimensions, Pressable, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';

import { useTheme } from '@/context/ThemeContext';
import {
  AchievementId,
  ACHIEVEMENTS,
} from '@/data/achievements/achievements.config';
import { ProgressionStructure } from '@/types/secureStore';
import achievementIconsById from '@/data/achievements/achievements.lookup';
import { getAchievementCarouselStyles } from './achievementCarousel.styles';
import { useNavigation } from 'expo-router';
import { NavigationProps } from '@/types/navigation';

interface IAchievementCarousel {
  achievements: AchievementId[];
  userProgression: ProgressionStructure;
  navigate?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_WIDTH = SCREEN_WIDTH;
const SPACING = 20;
const ITEM_WIDTH = CONTAINER_WIDTH * 0.75;
const SIDE_PADDING = (CONTAINER_WIDTH - ITEM_WIDTH) / 2;

const AchievementCarousel = ({
  achievements,
  userProgression,
  navigate,
}: IAchievementCarousel) => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('achievements');
  const { theme } = useTheme();
  const styles = getAchievementCarouselStyles(theme);

  const renderItem = ({ item }: { item: AchievementId }) => {
    const stepIndex = userProgression.achievements[item].stepIndex;

    const achievementData = ACHIEVEMENTS.find(
      (achievement) => achievement.id === item
    )!;

    return (
      <Pressable
        disabled={!navigate}
        onPress={() =>
          navigation.navigate('achievementDetail', { achievementId: item })
        }
        style={({ pressed }) => [
          styles.carouselCard,
          {
            opacity: pressed ? 0.7 : 1,
            width: ITEM_WIDTH,
          },
        ]}
      >
        <Text style={styles.achievementHeaderText}>{t(`${item}.title`)}</Text>
        <Image
          style={styles.icon}
          source={achievementIconsById[item][stepIndex]}
        />
        <Text style={styles.achievementText}>
          {t(`${item}.description`, {
            number:
              achievementData.thresholds[
                userProgression.achievements[item].stepIndex
              ],
          })}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      horizontal
      data={achievements}
      keyExtractor={(achievement) => achievement}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: SPACING,
        paddingHorizontal: SIDE_PADDING,
      }}
      snapToInterval={ITEM_WIDTH + SPACING}
      decelerationRate="fast"
      disableIntervalMomentum
    />
  );
};

export default AchievementCarousel;
