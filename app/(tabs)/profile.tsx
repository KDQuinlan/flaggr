import { useMemo } from 'react';
import { useNavigation } from 'expo-router';
import {
  PixelRatio,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationProps } from '@/types/navigation';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_HOME_AND_SETTINGS_ID, BANNER_TEST_ID } from '@/constants/adId';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import { getProfileStyles } from '@/styles/profile';
import { Divider } from 'react-native-paper';
import formatPercent from '@/util/formatPercent/formatPercent';
import flags from '@/assets/images/flags';
import { Passport, PassportEntry } from '@/types/secureStore';
import { Feather } from '@expo/vector-icons';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import { SCREEN_MAX_WIDTH } from '@/constants/common';

// TODO - refactor xp bar into progress bar component from rn-paper?

interface IStatsCategory {
  title: string;
  entry: PassportEntry;
  sortedPassport: Passport;
  accessibilityLabel: string;
}

const StatsCategory = ({
  title,
  entry,
  sortedPassport,
  accessibilityLabel,
}: IStatsCategory) => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('profile');
  const { theme } = useTheme();
  const styles = useMemo(() => getProfileStyles(theme), [theme]);

  const { width } = useWindowDimensions();
  const fontScale = PixelRatio.getFontScale();
  const isCompactMode = width <= 400 && fontScale >= 1.5;

  const columns = width >= SCREEN_MAX_WIDTH * 2.2 ? 2 : 1;

  const answeredTotal = entry.correctTotal + entry.incorrectTotal;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.statsCategoryContainer,
        {
          opacity: pressed ? 0.7 : 1,
          paddingBottom: 20,
          paddingTop: 10,
          flexBasis: `${100 / columns}%`,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={t('categoryAccessibilityHint')}
      onPress={() => navigation.navigate('stats', { title, sortedPassport })}
    >
      <Text importantForAccessibility="no" style={styles.statsHeaderText}>
        {title}
      </Text>
      {isCompactMode ? (
        <View
          importantForAccessibility="no-hide-descendants"
          style={styles.statsDataContainerCompact}
        >
          <Text style={styles.statsSubHeaderText}>
            {t(`countries.${toJsonKeyFormat(entry.countryName)}`, {
              ns: 'data',
            })}
          </Text>
          <Text style={styles.statsText}>
            {t('guessRateText', {
              percent: formatPercent(
                (entry.correctTotal / answeredTotal) * 100
              ),
            })}
          </Text>
          <Text style={styles.statsText}>
            {answeredTotal === 1
              ? t('timesAnsweredText')
              : t('timesAnsweredPluralText', { number: answeredTotal })}
          </Text>
          <Image
            contentFit="contain"
            style={styles.statsImageCompact}
            source={flags[entry.countryCode.toLowerCase()]}
          />
          <Feather
            name="chevron-right"
            size={32}
            color={theme.text}
            style={{ position: 'absolute', right: 0 }}
          />
        </View>
      ) : (
        <View
          importantForAccessibility="no-hide-descendants"
          style={styles.statsDataContainer}
        >
          <Image
            contentFit="contain"
            style={{ ...styles.statsImage, marginLeft: 20 }}
            source={flags[entry.countryCode.toLowerCase()]}
          />
          <View style={styles.statsInfoIconContainer}>
            <Text style={styles.statsSubHeaderText}>
              {t(`countries.${toJsonKeyFormat(entry.countryName)}`, {
                ns: 'data',
              })}
            </Text>
            <Text style={styles.statsText}>
              {t('guessRateText', {
                percent: formatPercent(
                  (entry.correctTotal / answeredTotal) * 100
                ),
              })}
            </Text>
            <Text style={styles.statsText}>
              {answeredTotal === 1
                ? t('timesAnsweredText')
                : t('timesAnsweredPluralText', { number: answeredTotal })}
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={32}
            color={theme.text}
            style={{ marginRight: 8 }}
          />
        </View>
      )}
    </Pressable>
  );
};

const ProfileScreen = () => {
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const userProgression = stateStore((s) => s.userProgress);
  const { isPremiumUser, userLevel, userDisplayName } = userSettings;
  const { level, currentLevelExperienceRequired, experienceUntilNextLevelUp } =
    userLevel;
  const { t } = useTranslation('profile');
  const { theme } = useTheme();
  const styles = useMemo(() => getProfileStyles(theme), [theme]);

  const showAds = !isPremiumUser && isInternetAvailable;

  const passportSortedByGuessAmount = [...userProgression.passport].sort(
    (a, b) =>
      b.correctTotal + b.incorrectTotal - (a.correctTotal + a.incorrectTotal)
  );

  const passportSortedByGuessRate = [...userProgression.passport].sort(
    (a, b) =>
      b.correctTotal / (b.correctTotal + b.incorrectTotal) -
      a.correctTotal / (a.correctTotal + a.incorrectTotal)
  );

  const passportHighestGuessRate = passportSortedByGuessRate[0];
  const passportLowestGuessRate = passportSortedByGuessRate.at(-1);

  const userHasPassportStats =
    passportSortedByGuessAmount.length > 0 &&
    passportSortedByGuessRate.length > 0;

  const statsCategories: IStatsCategory[] = [
    {
      title: t('highestGuessRatesTitle'),
      entry: passportHighestGuessRate!,
      sortedPassport: passportSortedByGuessRate,
      accessibilityLabel: t('highestGuessRatesAccessibilityLabel'),
    },
    {
      title: t('lowestGuessRatesTitle'),
      entry: passportLowestGuessRate!,
      sortedPassport: passportSortedByGuessRate.toReversed(),
      accessibilityLabel: t('lowestGuessRatesAccessibilityLabel'),
    },
    {
      title: t('mostAnsweredTitle'),
      entry: passportSortedByGuessAmount[0]!,
      sortedPassport: passportSortedByGuessAmount,
      accessibilityLabel: t('mostAnsweredAccessibilityLabel'),
    },
  ];

  return (
    <SafeAreaProvider style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.usernameText}>{userDisplayName}</Text>
        <Image
          accessible={false}
          style={styles.icon}
          source={require('@/assets/images/icon.png')}
        />
        <View style={{ ...styles.genericContainer, gap: 5 }}>
          <Text style={styles.levelText}>{t('level', { number: level })}</Text>
          <View style={styles.progressBarContainer}>
            <View
              accessibilityLabel={t('levelBarAccessibilityLabel')}
              style={{
                ...styles.progressBar,
                width: `${Math.round((1 - experienceUntilNextLevelUp / currentLevelExperienceRequired) * 100)}%`,
              }}
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.subtitleText}>{t('achievements')}</Text>

        <Divider style={styles.divider} />

        <Text style={styles.subtitleText}>{t('stats')}</Text>

        {userHasPassportStats ? (
          <View style={styles.statsContainer}>
            {statsCategories.map((entry, index) => (
              <StatsCategory key={index} {...entry} />
            ))}
          </View>
        ) : (
          <Text style={styles.statsText}>{t('statsEmpty')}</Text>
        )}
      </ScrollView>

      {showAds && (
        <AdBanner
          adId={__DEV__ ? BANNER_TEST_ID : BANNER_HOME_AND_SETTINGS_ID}
        />
      )}
    </SafeAreaProvider>
  );
};

export default ProfileScreen;
