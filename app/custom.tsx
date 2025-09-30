import Slider from '@react-native-community/slider';
import { colors } from '@/components/colors';
import ModifierMultiSelect from '@/components/modifierMultiSelect/modifierMultiSelect';
import {
  MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS,
  MINIMUM_CUSTOM_TIME_LIMIT_SECONDS,
  VALID_REGIONS,
} from '@/constants/common';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const CustomScreen = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(
    MINIMUM_CUSTOM_TIME_LIMIT_SECONDS
  );

  console.log(timeLimit);
  // TODO - remove decimal potential from slider

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View>
        <Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: 'bold' }}>
          Modifiers
        </Text>
        <Text style={styles.subheaderText}>Region(s)</Text>
        <ModifierMultiSelect
          varient="regions"
          modifier={VALID_REGIONS}
          onChange={setSelectedRegions}
        />
        <Text style={styles.subheaderText}>Time</Text>
        <Slider
          style={{ width: '60%', alignSelf: 'center' }}
          minimumValue={MINIMUM_CUSTOM_TIME_LIMIT_SECONDS}
          maximumValue={MAXIMUM_CUSTOM_TIME_LIMIT_SECONDS}
          onValueChange={(val) => setTimeLimit(val)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        accessibilityLabel="Continue to difficulty selection"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    borderRadius: 5,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  subheaderText: {
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blueSecondary,
  },
});

export default CustomScreen;
