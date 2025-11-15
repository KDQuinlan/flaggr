import { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { useNavigation } from 'expo-router';
import { Divider, List, Switch } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

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
import { TimeLimits } from '@/types/screens';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import determineSetTimestamp from '@/util/determineSetTimestamp/determineSetTimestamp';
import { getCustomStyles } from '@/styles/custom';
import { useTheme } from '@/context/ThemeContext';

// TODO - refactor rn image to expo image?

const CustomScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('custom');
  const { theme } = useTheme();
  const styles = useMemo(() => getCustomStyles(theme), [theme]);
  const userProgression = stateStore((s) => s.userProgress);
  const setProgression = stateStore((s) => s.setProgression);
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);
  const userSettings = stateStore((s) => s.userSettings);
  const { energyAmount, isPremiumUser } = userSettings;

  const [isScoreAccordionExpanded, setIsScoreAccordionExpanded] =
    useState<boolean>(false);
  const [isStatsAccordionExpanded, setIsStatsAccordionExpanded] =
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

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsScoreAccordionExpanded(false);
    setIsStatsAccordionExpanded(false);
    setSelectedRegions([]);
    setIsIndependentOnly(false);
    setGameLengthSlider(DEFAULT_GAME_LENGTH);
    setTimeLimitSlider(MINIMUM_CUSTOM_TIME_LIMIT_SECONDS);
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

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {!!score && (
          <View style={styles.accordionContainer}>
            <List.Accordion
              title={t('highScoreAccordion.title', { score })}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="trophy"
                  color={colors.bluePrimary}
                />
              )}
              expanded={isScoreAccordionExpanded}
              style={{ backgroundColor: theme.card }}
              titleStyle={{ color: theme.text }}
              onPress={() =>
                setIsScoreAccordionExpanded(!isScoreAccordionExpanded)
              }
            >
              <List.Item
                title={t('highScoreAccordion.regions', {
                  regions: regions.join(', '),
                })}
                titleStyle={{ color: theme.text }}
                style={{ backgroundColor: theme.card }}
              />

              <List.Item
                title={
                  independentCountriesOnly
                    ? t('highScoreAccordion.independentCountriesOnlyEnabled')
                    : t('highScoreAccordion.independentCountriesOnlyDisabled')
                }
                titleStyle={{ color: theme.text }}
                style={{ backgroundColor: theme.card }}
              />

              <List.Item
                title={t('highScoreAccordion.timeLimit', { timeLimit })}
                titleStyle={{ color: theme.text }}
                style={{ backgroundColor: theme.card }}
              />

              <List.Item
                title={t('highScoreAccordion.gameLength', { gameLength })}
                titleStyle={{ color: theme.text }}
                style={{ backgroundColor: theme.card }}
              />

              <List.Item
                title={t('highScoreAccordion.correct', { correct })}
                titleStyle={{ color: theme.text }}
                style={{ backgroundColor: theme.card }}
              />

              <List.Item
                title={t('highScoreAccordion.incorrect', { incorrect })}
                titleStyle={{ color: theme.text }}
                style={{ backgroundColor: theme.card }}
              />

              <List.Item
                title={t('highScoreAccordion.bestStreak', { streak })}
                titleStyle={{ color: theme.text }}
                style={{ backgroundColor: theme.card }}
              />
            </List.Accordion>
          </View>
        )}

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
            <TouchableOpacity
              onPress={() => handleReset()}
              style={styles.resetButton}
              accessibilityRole="button"
              accessibilityLabel={t('reset')}
            >
              <Ionicons
                name="reload-outline"
                size={20}
                color={colors.blueSecondary}
              />
            </TouchableOpacity>
          </View>
          <ModifierMultiSelect
            varient="regions"
            value={selectedRegions}
            onChange={setSelectedRegions}
          />
          <Divider style={styles.divider} />
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
        <View style={styles.modifierContainer}>
          <Text style={styles.finalScoreMultiplierText}>
            {t('scoreMultiplier', {
              value: finalScoreMultiplier,
            })}
          </Text>

          <TouchableOpacity
            style={isDisabled ? styles.buttonDisabled : styles.buttonEnabled}
            disabled={isDisabled}
            activeOpacity={0.8}
            accessibilityLabel={t('start')}
            accessibilityRole="button"
            onPress={onStartPress}
          >
            <Text style={styles.buttonText}>{t('start')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomScreen;
