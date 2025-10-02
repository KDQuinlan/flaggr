import { useState } from 'react';
import Slider from '@react-native-community/slider';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors } from '@/components/colors';
import ModifierMultiSelect from '@/components/modifierMultiSelect/modifierMultiSelect';
import {
  DEFAULT_GAME_LENGTH,
  GAME_DIFFICULTIES,
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

const CustomScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [gameLength, setGameLength] = useState<number>(DEFAULT_GAME_LENGTH);
  const [timeLimit, setTimeLimit] = useState<number>(
    MINIMUM_CUSTOM_TIME_LIMIT_SECONDS
  );

  const isDisabled = selectedRegions.length === 0;

  const displayTime =
    timeLimit === MINIMUM_CUSTOM_TIME_LIMIT_SECONDS
      ? 'Unlimited'
      : `${timeLimit} Seconds`;

  const displayGameLength = gameLength === 0 ? 'No Limit' : gameLength;

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Modifiers</Text>

        <Text style={styles.subheader}>Regions</Text>
        <ModifierMultiSelect
          varient="regions"
          modifier={VALID_REGIONS}
          onChange={setSelectedRegions}
        />

        <Text style={styles.subheader}>Time Limit</Text>
        <Text style={styles.helperText}>{displayTime}</Text>

        <Slider
          style={styles.slider}
          minimumValue={MINIMUM_CUSTOM_TIME_LIMIT_SECONDS}
          maximumValue={MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS}
          step={15}
          value={0}
          onValueChange={setTimeLimit}
        />

        <Text style={styles.helperText}>
          Score Multiplier Bonus:{' '}
          {TIME_LIMIT_TO_SCORE_MULTIPLIER_MAP[timeLimit]}
        </Text>

        <Text style={styles.subheader}>Game Length</Text>

        <Text style={styles.helperText}>
          Maximum Questions: {displayGameLength}
        </Text>

        <Slider
          style={styles.slider}
          minimumValue={MINIMUM_GAME_LENGTH}
          maximumValue={MAXIMUM_GAME_LENGTH}
          step={5}
          value={10}
          onValueChange={setGameLength}
        />

        {gameLength === 0 && (
          <Text style={styles.helperText}>
            No limit could result in a significant amount of questions!
          </Text>
        )}
      </ScrollView>

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
              selectedRegions
            ),
            timeLimit,
          })
        }
      >
        <Text
          style={
            isDisabled ? styles.buttonTextDisabled : styles.buttonTextEnabled
          }
        >
          Start
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.bluePrimary,
    paddingBottom: 10,
  },
  subheader: {
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blueSecondary,
    alignSelf: 'center',
  },
  helperText: {
    color: colors.blueSecondary,
    fontSize: 14,
    paddingBottom: 10,
    textAlign: 'center',
  },
  slider: {
    width: '75%',
    alignSelf: 'center',
  },
  buttonEnabled: {
    backgroundColor: colors.bluePrimary,
    paddingVertical: 10,
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
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
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
