import { useState } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import Carousel from 'react-native-reanimated-carousel';

import { useTheme } from '@/context/ThemeContext';
import { AchievementId } from '@/data/achievements/achievements.config';
import { getSummarySharedStyles } from '@/styles/summary/summaryShared';
import { ProgressionStructure } from '@/types/secureStore';
import achievementIconsById from '@/data/achievements/achievements.lookup';
import { SCREEN_MAX_WIDTH } from '@/constants/common';
import { getAchievementCarouselStyles } from './achievementCarousel.styles';

// TODO - add accessibility for carousel

interface IAchievementCarousel {
  achievements: AchievementId[];
  userProgression: ProgressionStructure;
  showTitle?: boolean;
  onPress?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AchievementCarousel = ({
  achievements,
  userProgression,
  showTitle = true,
  onPress,
}: IAchievementCarousel) => {
  const { t } = useTranslation('achievements');
  const { theme } = useTheme();
  const sharedSummaryStyles = getSummarySharedStyles(theme);
  const styles = getAchievementCarouselStyles(theme);
  const [carouselHeight, setCarouselHeight] = useState(0);

  const renderItem = ({ item }: { item: AchievementId }) => {
    const stepIndex = userProgression.achievements[item].stepIndex;

    return (
      <Pressable
        onLayout={(e) => {
          const height = e.nativeEvent.layout.height;
          setCarouselHeight((prev) => Math.max(prev, height));
        }}
        disabled={!onPress}
        onPress={onPress}
        style={({ pressed }) => [
          styles.carouselCard,
          {
            opacity: pressed ? 0.7 : 1,
            width: SCREEN_WIDTH,
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
            number: userProgression.achievements[item].currentValue,
          })}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        maxWidth: SCREEN_MAX_WIDTH,
      }}
    >
      {showTitle && (
        <Text style={sharedSummaryStyles.valueText}>{t('title')}</Text>
      )}

      <Carousel
        width={SCREEN_WIDTH}
        height={carouselHeight || 1}
        data={achievements}
        renderItem={renderItem}
        loop={false}
        mode="parallax"
        pagingEnabled
      />
    </View>
  );
};

export default AchievementCarousel;
