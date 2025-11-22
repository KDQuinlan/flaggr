import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { VALID_REGIONS } from '@/constants/common';
import { useTheme } from '@/context/ThemeContext';
import { useMemo } from 'react';
import { getModifierMultiSelectStyles } from './modifierMultiSelect.styles';

type ModifierMultiSelectVarients = 'regions' | 'quizType';

type ModifierMultiSelectProps = {
  varient: ModifierMultiSelectVarients;
  value: string[];
  onChange?: (selected: string[]) => void;
};

const MODIFIER_OPTIONS = {
  regions: VALID_REGIONS,
  quizType: [],
};

export default function ModifierMultiSelect({
  varient,
  value = [],
  onChange,
}: ModifierMultiSelectProps) {
  const { t } = useTranslation('data');
  const { theme } = useTheme();
  const styles = useMemo(() => getModifierMultiSelectStyles(theme), [theme]);

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
        const regionFormattedForLocalisation = item
          .toLowerCase()
          .replace(/\s+/g, '');
        return (
          <Pressable
            key={item}
            style={({ pressed }) => [
              styles.button,
              isSelected && styles.buttonSelected,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => toggleModifier(item)}
            accessibilityLabel={t('regions.buttonAccessibility', {
              option: regionFormattedForLocalisation,
            })}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.buttonText,
                isSelected && styles.buttonTextSelected,
              ]}
            >
              {t(`regions.${regionFormattedForLocalisation}`)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
