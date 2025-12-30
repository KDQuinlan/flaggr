import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { useNavigation } from 'expo-router';
import { Divider, Switch } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { colors } from '@/components/colors';
import ModifierMultiSelect from '@/components/modifierMultiSelect/modifierMultiSelect';
import { TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP } from '@/constants/mappers';
import generateMultipleChoice from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import { NavigationProps } from '@/types/navigation';
import {
  DEFAULT_GAME_LENGTH,
  DEFAULT_SCORE_MULTIPLIER,
  GAME_DIFFICULTIES,
  INDEPENDENT_COUNTRIES_PENALTY,
  MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS,
  MAXIMUM_GAME_LENGTH,
  MINIMUM_CUSTOM_TIME_LIMIT_SECONDS,
  MINIMUM_GAME_LENGTH,
} from '@/constants/common';
import stateStore from '@/state/store';
import setCurrentCustomGame from '@/util/updatedProgressionStructure/setCurrentCustomGame';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import determineSetTimestamp from '@/util/determineSetTimestamp/determineSetTimestamp';
import { getCustomStyles } from '@/styles/custom';
import { useTheme } from '@/context/ThemeContext';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_TEST_ID } from '@/constants/adId';
import { Feather } from '@expo/vector-icons';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import { TimeLimits } from '@/types/secureStore';

interface IStatsAccordionRow {
  title: string;
  value: string | number | boolean;
}

const CustomScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('custom');
  const { theme } = useTheme();
  const styles = useMemo(() => getCustomStyles(theme), [theme]);
  const userProgression = stateStore((s) => s.userProgress);
  const setProgression = stateStore((s) => s.setProgression);
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const { energyAmount, isPremiumUser } = userSettings;

  const showAds = !isPremiumUser && isInternetAvailable;

  const [isStatsAccordionOpen, setIsStatsAccordionOpen] =
    useState<boolean>(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isIndependentOnly, setIsIndependentOnly] = useState<boolean>(false);
  const [gameLengthSlider, setGameLengthSlider] =
    useState<number>(DEFAULT_GAME_LENGTH);
  const [timeLimitSlider, setTimeLimitSlider] = useState<TimeLimits>(
    MINIMUM_CUSTOM_TIME_LIMIT_SECONDS
  );

  useEffect(() => {
    navigation.setOptions({
      title: t('title'),
    });
  }, [navigation]);

  const {
    score,
    regions,
    independentCountriesOnly,
    timeLimit,
    gameLength,
    correct,
    incorrect,
    streak,
  } = userProgression.games.custom.bestGame;

  const localisedRegionArray = regions
    .map((region) => t(`regions.${toJsonKeyFormat(region)}`, { ns: 'data' }))
    .join(', ');

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsStatsAccordionOpen(false);
    setSelectedRegions([]);
    setIsIndependentOnly(false);
    setGameLengthSlider(DEFAULT_GAME_LENGTH);
    setTimeLimitSlider(MINIMUM_CUSTOM_TIME_LIMIT_SECONDS);
  };

  const handleUseSetup = () => {
    setIsStatsAccordionOpen(false);
    setSelectedRegions(regions);
    setIsIndependentOnly(independentCountriesOnly);
    setGameLengthSlider(gameLength);
    setTimeLimitSlider(timeLimit);
  };

  const isDisabled = selectedRegions.length === 0;

  const finalScoreMultiplier = parseFloat(
    (
      DEFAULT_SCORE_MULTIPLIER *
      (timeLimitSlider !== 0
        ? TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP[timeLimitSlider]
        : 1) *
      (isIndependentOnly ? INDEPENDENT_COUNTRIES_PENALTY : 1)
    ).toFixed(2)
  );

  const onStartPress = () => {
    if (energyAmount === 0 && !isPremiumUser) {
      setEnergyModalVisible(true);
    } else {
      navigation.navigate('multipleChoice', {
        title: 'Custom',
        gameMode: 'custom',
        questions: generateMultipleChoice(
          GAME_DIFFICULTIES,
          gameLengthSlider,
          selectedRegions,
          isIndependentOnly
        ),
        timeLimit: timeLimitSlider,
      });

      setProgression(
        setCurrentCustomGame(userProgression, {
          regions: selectedRegions,
          independentCountriesOnly: isIndependentOnly,
          timeLimit: timeLimitSlider,
          gameLength: gameLengthSlider,
          scoreMultiplier: finalScoreMultiplier,
        })
      );

      if (!isPremiumUser) {
        persistUserSettings({
          ...userSettings,
          energyAmount: energyAmount - 1,
          lastEnergyTimestamp: determineSetTimestamp(),
        });
      }
    }
  };

  const StatsAccordionRow = ({ title, value }: IStatsAccordionRow) => (
    <View style={styles.accordionRowContainer}>
      <Text style={styles.accordionText}>{title}</Text>
      <Text style={styles.accordionBoldText}>{value}</Text>
    </View>
  );

  const HighScoreAccordion = () => (
    <Pressable
      onPress={() => setIsStatsAccordionOpen(!isStatsAccordionOpen)}
      style={({ pressed }) => [
        styles.accordionContainer,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.accordionTitleText}>
          {t('highScoreAccordion.title')}
        </Text>
        <Feather
          name={isStatsAccordionOpen ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.text}
        />
      </View>
      {isStatsAccordionOpen && (
        <View style={{ gap: 20 }}>
          <Text style={styles.accordionSubtitleText}>
            {t('highScoreAccordion.statsTitle')}
          </Text>
          <View style={{ gap: 10 }}>
            <StatsAccordionRow
              title={t('highScoreAccordion.highScore')}
              value={score}
            />
            <StatsAccordionRow
              title={t('highScoreAccordion.correct')}
              value={correct}
            />
            <StatsAccordionRow
              title={t('highScoreAccordion.incorrect')}
              value={incorrect}
            />
            <StatsAccordionRow
              title={t('highScoreAccordion.bestStreak')}
              value={streak}
            />
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.accordionSubtitleText}>
            {t('highScoreAccordion.setupTitle')}
          </Text>
          <View style={{ gap: 10 }}>
            <StatsAccordionRow title="Regions" value={localisedRegionArray} />
            <StatsAccordionRow
              title={t('highScoreAccordion.independentOnly')}
              value={
                independentCountriesOnly
                  ? t('highScoreAccordion.independentOnlyEnabled')
                  : t('highScoreAccordion.independentOnlyDisabled')
              }
            />
            <StatsAccordionRow
              title={t('highScoreAccordion.timeLimit')}
              value={timeLimit === 0 ? t('gameRules.unlimited') : timeLimit}
            />
            <StatsAccordionRow
              title={t('highScoreAccordion.gameLength')}
              value={gameLength === 0 ? t('gameRules.unlimited') : gameLength}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.buttonEnabled,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            accessibilityLabel={t('highScoreAccordion.useSetup')}
            accessibilityRole="button"
            onPress={handleUseSetup}
          >
            <Text style={styles.buttonText}>
              {t('highScoreAccordion.useSetup')}
            </Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaProvider
      style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {!!score && <HighScoreAccordion />}

        {/* Regions */}
        <View style={styles.modifierContainer}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Image
                style={styles.sectionIcon}
                source={require('@/assets/images/icons/resources/custom/region.png')}
              />
              <Text style={styles.subHeader}>{t('regions.title')}</Text>
            </View>
            <Pressable
              onPress={() => handleReset()}
              style={({ pressed }) => [
                styles.resetButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              accessibilityRole="button"
              accessibilityLabel={t('reset')}
            >
              <Ionicons
                name="reload-outline"
                size={20}
                color={colors.blueSecondary}
              />
            </Pressable>
          </View>
          <ModifierMultiSelect
            varient="regions"
            value={selectedRegions}
            onChange={setSelectedRegions}
          />
          <View style={styles.independentCountriesContainer}>
            <View style={styles.independentCountriesTextContainer}>
              <Text style={styles.independentCountriesText}>
                {t('regions.independentCountriesOnly')}
              </Text>
              {isIndependentOnly && (
                <Text style={styles.independentCountriesMultiplierText}>
                  {t('scoreMultiplier', {
                    value: INDEPENDENT_COUNTRIES_PENALTY,
                  })}
                </Text>
              )}
            </View>
            <Switch
              color={colors.blueSecondary}
              value={isIndependentOnly}
              onValueChange={setIsIndependentOnly}
            />
          </View>
        </View>

        {/* Game Rules */}
        <View style={styles.modifierContainer}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Image
                style={styles.sectionIcon}
                source={require('@/assets/images/icons/resources/custom/cog.png')}
              />
              <Text style={styles.subHeader}>{t('gameRules.title')}</Text>
            </View>
          </View>

          {/* Time Limit */}
          <View style={styles.ruleContainer}>
            <View style={styles.sliderHeaderContainer}>
              <Text
                style={styles.ruleLabel}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {t('gameRules.timeLimit')}
              </Text>

              <View style={styles.sliderQuantityContainer}>
                <Text style={styles.sliderQuantityText}>
                  {timeLimitSlider === 0
                    ? t('gameRules.unlimited')
                    : t('gameRules.timeLimitQuantity', {
                        timeLimit: timeLimitSlider,
                        scoreMultiplier:
                          TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP[timeLimitSlider],
                      })}
                </Text>
              </View>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={MINIMUM_CUSTOM_TIME_LIMIT_SECONDS}
              maximumValue={MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS}
              step={15}
              value={timeLimitSlider}
              onValueChange={(value: number) =>
                setTimeLimitSlider(value as TimeLimits)
              }
              minimumTrackTintColor={colors.blueSecondary}
              maximumTrackTintColor={theme.text}
              thumbTintColor={colors.blueSecondary}
            />

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>
                {t('gameRules.unlimited')}
              </Text>
              <Text style={styles.sliderLabelText}>
                {MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS}
              </Text>
            </View>
          </View>

          {/* Game Length */}
          <View style={styles.ruleContainer}>
            <View style={styles.sliderHeaderContainer}>
              <Text style={styles.ruleLabel}>{t('gameRules.gameLength')}</Text>

              <Text style={styles.sliderQuantityText}>
                {gameLengthSlider === 0
                  ? t('gameRules.unlimited')
                  : t('gameRules.gameLengthQuantity', {
                      gameLength: gameLengthSlider,
                    })}
              </Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={MINIMUM_GAME_LENGTH}
              maximumValue={MAXIMUM_GAME_LENGTH}
              step={5}
              value={gameLengthSlider}
              onValueChange={setGameLengthSlider}
              minimumTrackTintColor={colors.blueSecondary}
              maximumTrackTintColor={theme.text}
              thumbTintColor={colors.blueSecondary}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>
                {t('gameRules.unlimited')}
              </Text>
              <Text style={styles.sliderLabelText}>{MAXIMUM_GAME_LENGTH}</Text>
            </View>
            {gameLengthSlider === 0 && (
              <Text style={styles.helperText}>
                {t('gameRules.gameLengthWarning')}
              </Text>
            )}
          </View>
        </View>

        {/* TODO - Remove marginBottom on screen styling refactor*/}
        <View style={{ ...styles.modifierContainer, marginBottom: 20 }}>
          <Text style={styles.finalScoreMultiplierText}>
            {t('scoreMultiplier', {
              value: finalScoreMultiplier,
            })}
          </Text>

          <Pressable
            style={({ pressed }) => [
              isDisabled ? styles.buttonDisabled : styles.buttonEnabled,
              { opacity: pressed ? 0.7 : isDisabled ? 0.5 : 1 },
            ]}
            disabled={isDisabled}
            accessibilityLabel={t('start')}
            accessibilityRole="button"
            onPress={onStartPress}
          >
            <Text style={styles.buttonText}>{t('start')}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaProvider>
  );
};

export default CustomScreen;
