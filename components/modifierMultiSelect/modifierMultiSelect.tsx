import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
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
    <FlatList
      data={modifier}
      keyExtractor={(item) => item}
      numColumns={2}
      style={{ flexGrow: 0, paddingBottom: 20 }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
      renderItem={({ item }) => {
        const isSelected = selected.includes(item);
        return (
          <TouchableOpacity
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
      }}
    />
  );
};

const styles = StyleSheet.create({
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
