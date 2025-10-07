import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  PixelRatio,
} from 'react-native';

import { colors } from '@/components/colors';
import { VALID_REGIONS } from '@/constants/common';

type ModifierMultiSelectVarients = 'regions' | 'quizType';

type ModifierMultiSelectProps = {
  varient: ModifierMultiSelectVarients;
  value: string[];
  onChange?: (selected: string[]) => void;
};

const fontScale = PixelRatio.getFontScale();
const dynamicButtonHeight = Math.min(50 * fontScale, 80);

const MODIFIER_OPTIONS = {
  regions: VALID_REGIONS,
  quizType: [],
};

export default function ModifierMultiSelect({
  varient,
  value = [],
  onChange,
}: ModifierMultiSelectProps) {
  const toggleModifier = (item: string) => {
    const newSelection = value.includes(item)
      ? value.filter((m) => m !== item)
      : [...value, item];
    onChange?.(newSelection);
  };

  const options = MODIFIER_OPTIONS[varient];

  return (
    <View style={styles.container}>
      {options.map((item) => {
        const isSelected = value.includes(item);
        return (
          <TouchableOpacity
            key={item}
            style={[styles.button, isSelected && styles.buttonSelected]}
            onPress={() => toggleModifier(item)}
            activeOpacity={0.8}
            accessibilityLabel={`Toggle ${item}`}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.buttonText,
                isSelected && styles.buttonTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  button: {
    flexBasis: '48%',
    height: dynamicButtonHeight,
    backgroundColor: colors.offWhite,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
  },
  buttonSelected: {
    backgroundColor: colors.bluePrimary,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonTextSelected: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
