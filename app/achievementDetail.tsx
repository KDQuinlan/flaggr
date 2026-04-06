import { useEffect, useMemo } from 'react';
import { useNavigation } from 'expo-router';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavigationProps, RootStackParamList } from '@/types/navigation';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_HOME_AND_SETTINGS_ID, BANNER_TEST_ID } from '@/constants/adId';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getAchievementDetailStyles } from '@/styles/achievementDetail';
import { ACHIEVEMENTS } from '@/data/achievements/achievements.config';
import achievementIconsById from '@/data/achievements/achievements.lookup';

// TODO - create more elegant scaling solution for content on smaller devices

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_WIDTH = SCREEN_WIDTH;
const SPACING = 20;
const ITEM_WIDTH = CONTAINER_WIDTH * 0.75;
const SIDE_PADDING = (CONTAINER_WIDTH - ITEM_WIDTH) / 2;

const AchievementDetail = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'achievementDetail'>>();
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const userProgression = stateStore((s) => s.userProgress);
  const { isPremiumUser } = userSettings;
  const { achievementId } = route.params;
  const { t } = useTranslation('achievements');
  const { theme } = useTheme();
  const styles = useMemo(() => getAchievementDetailStyles(theme), [theme]);

  useEffect(() => {
    navigation.setOptions({ title: t(`${achievementId}.title`) });
  }, [navigation]);

  const showAds = !isPremiumUser && isInternetAvailable;

  const achievementData = userProgression.achievements[achievementId];
  const achievementConfig = ACHIEVEMENTS.find(
    (achievement) => achievement.id === achievementId
  )!;
  const achievementStep = achievementData.stepIndex;
  const achievementUnlockTimestamps = achievementData.unlockedTimestamps;

  const renderItem = ({ item }: { item: number }) => {
    // @ts-ignore
    // TODO - resolve error "Argument of type 'number' is not assignable to parameter of type 'never'."
    const thresholdIndex = achievementConfig.thresholds.indexOf(item);
    const isUnlocked = achievementStep >= thresholdIndex;

    const formattedUnlockedTime =
      isUnlocked &&
      new Date(achievementUnlockTimestamps[thresholdIndex]!).toLocaleDateString(
        'en-GB',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }
      );

    return (
      <View style={[styles.carouselCard, { width: ITEM_WIDTH }]}>
        <Text style={styles.tabText}>
          {isUnlocked ? t('unlocked') : t('locked')}
        </Text>
        <View style={styles.contentContainer}>
          <Image
            style={{
              ...styles.image,
              opacity: isUnlocked ? 1 : 0.3,
            }}
            source={achievementIconsById[achievementId][thresholdIndex]}
          />
          <Text style={styles.descriptionText}>
            {t(`${achievementId}.description`, {
              number: achievementConfig.thresholds[thresholdIndex],
            })}
          </Text>
          {isUnlocked ? (
            <Text style={styles.progressText}>
              {t('dateUnlocked', { date: formattedUnlockedTime })}
            </Text>
          ) : (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                {achievementData.currentValue} /{' '}
                {achievementConfig.thresholds[thresholdIndex]!}
              </Text>
              <View style={styles.progressBarContainer}>
                <View
                  accessibilityLabel={t('levelBarAccessibilityLabel')}
                  style={{
                    ...styles.progressBar,
                    width: `${(achievementData.currentValue / achievementConfig.thresholds[thresholdIndex]!) * 100}%`,
                  }}
                />
              </View>
            </View>
          )}
        </View>
        <Text style={styles.tabText}>
          {t('page', {
            page: thresholdIndex + 1,
            maximumPage: achievementConfig.thresholds.length,
          })}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}>
      <FlatList
        horizontal
        data={achievementConfig.thresholds}
        keyExtractor={(threshold) => threshold.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: SPACING,
          paddingHorizontal: SIDE_PADDING,
        }}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        style={styles.flatlistStyle}
        initialScrollIndex={achievementStep}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + SPACING,
          offset: (ITEM_WIDTH + SPACING) * index,
          index,
        })}
      />

      {showAds && (
        <AdBanner
          adId={__DEV__ ? BANNER_TEST_ID : BANNER_HOME_AND_SETTINGS_ID}
        />
      )}
    </View>
  );
};

export default AchievementDetail;
