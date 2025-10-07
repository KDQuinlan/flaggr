import { useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { useNavigation } from 'expo-router';
import { Divider, Switch } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

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
import HighScoreAccordion from '@/components/highScoreAccordion/highScoreAccordion';

const CustomScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const userProgression = stateStore((state) => state.userProgress);
  const setProgression = stateStore((state) => state.setProgression);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isIndependentOnly, setIsIndependentOnly] = useState<boolean>(false);
  const [gameLengthSlider, setGameLengthSlider] =
    useState<number>(DEFAULT_GAME_LENGTH);
  const [timeLimitSlider, setTimeLimitSlider] = useState<number>(
    MINIMUM_CUSTOM_TIME_LIMIT_SECONDS
  );

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
    setSelectedRegions([]);
    setIsIndependentOnly(false);
    setGameLengthSlider(DEFAULT_GAME_LENGTH);
    setTimeLimitSlider(MINIMUM_CUSTOM_TIME_LIMIT_SECONDS);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => handleReset()}
          style={styles.resetButton}
        >
          <Ionicons
            name="reload-outline"
            size={20}
            color={colors.blueSecondary}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleReset]);

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

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {!!score && (
          <HighScoreAccordion
            score={score}
            regions={regions}
            independentCountriesOnly={independentCountriesOnly}
            timeLimit={timeLimit}
            gameLength={gameLength}
            correct={correct}
            incorrect={incorrect}
            streak={streak}
          />
        )}
        {/* Regions */}
        <View style={styles.modifierContainer}>
          <View style={styles.sectionHeader}>
            <Image
              style={styles.sectionIcon}
              source={require('@/assets/images/icons/resources/custom/region.png')}
            />
            <Text style={styles.subHeader}>Regions</Text>
          </View>
          <ModifierMultiSelect
            varient="regions"
            value={selectedRegions}
            onChange={setSelectedRegions}
          />
          <Divider style={styles.divier} />
          <View style={styles.independentCountriesContainer}>
            <View style={styles.independentCountriesTextContainer}>
              <Text style={styles.independentCountriesText}>
                Independent Countries Only
              </Text>
              {isIndependentOnly && (
                <Text style={styles.independentCountriesMultiplierText}>
                  {INDEPENDENT_COUNTRIES_PENALTY}x Score Multiplier
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
          <View style={styles.sectionHeader}>
            <Image
              style={styles.sectionIcon}
              source={require('@/assets/images/icons/resources/custom/cog.png')}
            />
            <Text style={styles.subHeader}>Game Rules</Text>
          </View>

          {/* Time Limit */}
          <View style={styles.ruleContainer}>
            <View style={styles.sliderHeaderContainer}>
              <Text
                style={styles.ruleLabel}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Time Limit
              </Text>

              <View style={styles.sliderQuantityContainer}>
                <Text style={styles.sliderQuantityText}>
                  {timeLimitSlider === 0
                    ? 'Unlimited'
                    : `${timeLimitSlider} Seconds (${TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP[timeLimitSlider]}x)`}
                </Text>
              </View>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={MINIMUM_CUSTOM_TIME_LIMIT_SECONDS}
              maximumValue={MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS}
              step={15}
              value={timeLimitSlider}
              onValueChange={setTimeLimitSlider}
            />

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Unlimited</Text>
              <Text style={styles.sliderLabelText}>
                {MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS}
              </Text>
            </View>
          </View>

          {/* Game Length */}
          <View style={styles.ruleContainer}>
            <View style={styles.sliderHeaderContainer}>
              <Text style={styles.ruleLabel}>Game Length</Text>

              <Text style={styles.sliderQuantityText}>
                {gameLengthSlider === 0
                  ? 'Unlimited'
                  : `${gameLengthSlider} Questions`}
              </Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={MINIMUM_GAME_LENGTH}
              maximumValue={MAXIMUM_GAME_LENGTH}
              step={5}
              value={gameLengthSlider}
              onValueChange={setGameLengthSlider}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Unlimited</Text>
              <Text style={styles.sliderLabelText}>{MAXIMUM_GAME_LENGTH}</Text>
            </View>
            {gameLengthSlider === 0 && (
              <Text style={styles.helperText}>
                No limit could result in a significant amount of questions!
              </Text>
            )}
          </View>
        </View>
        <View style={styles.modifierContainer}>
          <Text style={styles.helperText}>
            Score Multiplier: {finalScoreMultiplier}
          </Text>

          <TouchableOpacity
            style={isDisabled ? styles.buttonDisabled : styles.buttonEnabled}
            disabled={isDisabled}
            activeOpacity={0.8}
            accessibilityLabel="Continue to difficulty selection"
            accessibilityRole="button"
            onPress={() => {
              setProgression(
                setCurrentCustomGame(userProgression, {
                  regions: selectedRegions,
                  independentCountriesOnly: isIndependentOnly,
                  timeLimit: timeLimitSlider,
                  gameLength: gameLengthSlider,
                  scoreMultiplier: finalScoreMultiplier,
                })
              );
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
            }}
          >
            <Text
              style={
                isDisabled
                  ? styles.buttonTextDisabled
                  : styles.buttonTextEnabled
              }
            >
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  modifierContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
    paddingBottom: 5,
    width: '100%',
  },
  independentCountriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  independentCountriesTextContainer: {
    flex: 1,
    flexShrink: 1,
    justifyContent: 'center',
  },
  independentCountriesText: {
    color: colors.blueSecondary,
    fontWeight: '500',
    paddingRight: 5,
    flexWrap: 'wrap',
  },
  independentCountriesMultiplierText: {
    color: colors.blueSecondary,
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  sectionIcon: {
    height: 20,
    width: 20,
  },
  subHeader: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blueSecondary,
    paddingLeft: 10,
  },
  ruleContainer: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  ruleLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.blueSecondary,
    paddingLeft: 10,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    alignSelf: 'center',
  },
  sliderHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  sliderQuantityContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  sliderQuantityText: {
    textAlign: 'right',
    fontSize: 12,
    color: colors.blueSecondary,
    fontWeight: '500',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  sliderLabels: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 15,
  },
  sliderLabelText: {
    fontSize: 12,
    color: colors.blueSecondary,
    fontStyle: 'italic',
  },
  helperText: {
    color: colors.blueSecondary,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
  },
  buttonEnabled: {
    backgroundColor: colors.bluePrimary,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.bluePrimary,
    opacity: 0.5,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonTextEnabled: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  buttonTextDisabled: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  divier: {
    height: 1,
    backgroundColor: colors.lightGrey,
    marginVertical: 5,
  },
  resetButton: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomScreen;
