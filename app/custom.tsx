import { colors } from '@/components/colors';
import ModifierMultiSelect from '@/components/modifierMultiSelect/modifierMultiSelect';
import { VALID_REGIONS } from '@/constants/common';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const CustomScreen = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View>
        <Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: 'bold' }}>
          Modifiers
        </Text>
        <Text>Region(s)</Text>
        <ModifierMultiSelect varient="regions" modifier={VALID_REGIONS} />
        <Text>Time</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={true}
          activeOpacity={0.8}
          accessibilityLabel="Continue to difficulty selection"
          accessibilityRole="button"
        >
          <Text>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: colors.offWhite,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
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
});

export default CustomScreen;
