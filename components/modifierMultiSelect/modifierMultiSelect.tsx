import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/components/colors';

type ModifierMultiSelectVarients = 'regions' | 'quizType';

type ModifierMultiSelectProps = {
  varient: ModifierMultiSelectVarients;
  modifier: string[];
  onChange?: (selected: string[]) => void;
};

const ModifierMultiSelect: React.FC<ModifierMultiSelectProps> = ({
  varient,
  modifier,
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleModifier = (modifierKey: string) => {
    setSelected((prev) => {
      const newSelection = prev.includes(modifierKey)
        ? prev.filter((m) => m !== modifierKey)
        : [...prev, modifierKey];
      onChange?.(newSelection);
      return newSelection;
    });
  };

  return (
    <View style={styles.container}>
      {modifier.map((item) => {
        const isSelected = selected.includes(item);
        return (
          <TouchableOpacity
            key={item}
            style={[styles.button, isSelected && styles.buttonSelected]}
            activeOpacity={0.8}
            onPress={() => toggleModifier(item)}
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
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  button: {
    width: '48%',
    backgroundColor: colors.offWhite,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 12,
  },
  buttonSelected: {
    backgroundColor: colors.bluePrimary,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 16,
  },
  buttonTextSelected: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ModifierMultiSelect;
