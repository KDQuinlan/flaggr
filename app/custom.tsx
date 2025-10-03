import { useState } from 'react';
import Slider from '@react-native-community/slider';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { colors } from '@/components/colors';
import ModifierMultiSelect from '@/components/modifierMultiSelect/modifierMultiSelect';
import {
  DEFAULT_GAME_LENGTH,
  DEFAULT_SCORE_MULTIPLIER,
  GAME_DIFFICULTIES,
  INDEPENDENT_COUNTRIES_PENALTY,
  MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS,
  MAXIMUM_GAME_LENGTH,
  MINIMUM_CUSTOM_TIME_LIMIT_SECONDS,
  MINIMUM_GAME_LENGTH,
  VALID_REGIONS,
} from '@/constants/common';
import { TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP } from '@/constants/mappers';
import generateMultipleChoice from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import { useNavigation } from 'expo-router';
import { NavigationProps } from '@/types/navigation';
import { Checkbox } from 'react-native-paper';

// TODO - break each section into a separate component?
// TODO - Add line below regions to separate independent countries

const CustomScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isIndependentOnly, setIsIndependentOnly] = useState<boolean>(false);
  const [gameLength, setGameLength] = useState<number>(DEFAULT_GAME_LENGTH);
  const [timeLimit, setTimeLimit] = useState<number>(
    MINIMUM_CUSTOM_TIME_LIMIT_SECONDS
  );

  const isDisabled = selectedRegions.length === 0;

  const finalScoreMultiplier =
    DEFAULT_SCORE_MULTIPLIER *
    (timeLimit !== 0 ? TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP[timeLimit] : 1) *
    (isIndependentOnly ? INDEPENDENT_COUNTRIES_PENALTY : 1);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Regions */}
        <View
          style={{
            ...styles.modifierContainer,
            paddingBottom: isIndependentOnly ? 10 : 0,
          }}
        >
          <View style={styles.sectionHeader}>
            <Image
              style={styles.sectionIcon}
              source={require('@/assets/images/icons/resources/custom/region.png')}
            />
            <Text style={styles.subheader}>Regions</Text>
          </View>
          <ModifierMultiSelect
            varient="regions"
            modifier={VALID_REGIONS}
            onChange={setSelectedRegions}
          />
          <View style={styles.independentCountriesContainer}>
            <View style={styles.independentCountriesTextContainer}>
              <Text>Independent Countries Only</Text>
              {isIndependentOnly && (
                <Text style={{ fontSize: 12 }}>
                  ({INDEPENDENT_COUNTRIES_PENALTY}x Score Multiplier)
                </Text>
              )}
            </View>
            <Checkbox
              color={colors.blueSecondary}
              status={isIndependentOnly ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsIndependentOnly(!isIndependentOnly);
              }}
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
            <Text style={styles.subheader}>Game Rules</Text>
          </View>

          {/* Time Limit */}
          <View style={styles.ruleContainer}>
            <View style={styles.sliderHeaderContainer}>
              <Text style={styles.ruleLabel}>Time Limit</Text>

              <Text style={styles.sliderQuantityText}>
                {timeLimit === 0 ? 'Unlimited' : `${timeLimit} Seconds`}
              </Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={MINIMUM_CUSTOM_TIME_LIMIT_SECONDS}
              maximumValue={MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS}
              step={15}
              value={0}
              onValueChange={setTimeLimit}
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
                {gameLength === 0 ? 'Unlimited' : `${gameLength} Questions`}
              </Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={MINIMUM_GAME_LENGTH}
              maximumValue={MAXIMUM_GAME_LENGTH}
              step={5}
              value={10}
              onValueChange={setGameLength}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Unlimited</Text>
              <Text style={styles.sliderLabelText}>{MAXIMUM_GAME_LENGTH}</Text>
            </View>
            {gameLength === 0 && (
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
            onPress={() =>
              navigation.navigate('multipleChoice', {
                title: 'Custom',
                gameMode: 'custom',
                questions: generateMultipleChoice(
                  GAME_DIFFICULTIES,
                  gameLength,
                  selectedRegions,
                  isIndependentOnly
                ),
                timeLimit,
              })
            }
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
    width: '100%',
  },
  independentCountriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  independentCountriesTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  subheader: {
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
    marginRight: 10,
  },
  sliderLabels: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 15,
  },
  sliderLabelText: {
    fontSize: 12,
  },
  sliderQuantityText: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: colors.blueSecondary,
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
});

export default CustomScreen;
