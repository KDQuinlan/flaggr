import React, { SetStateAction, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';

import { useTheme } from '@/context/ThemeContext';
import { getDropdownStyles } from './dropdown.styles';

interface ILanguageDropdownProps {
  value: string | null;
  setValue: (value: SetStateAction<string>) => void;
  text: {
    namespace: string;
    label: string;
    labelSubtext?: string;
    helperText?: string;
    placeholder?: string;
  };
  data: {
    label: string;
    value: string | number;
  }[];
}

const DropdownSelector = React.memo(
  ({ value, setValue, data, text }: ILanguageDropdownProps) => {
    const { t } = useTranslation('settings');
    const { theme } = useTheme();
    const styles = useMemo(() => getDropdownStyles(theme), [theme]);

    return (
      <View>
        <Text style={styles.label}>
          {t(text.label, { ns: text.namespace })}{' '}
          {text.labelSubtext && (
            <Text style={styles.labelSubtext}>({t(text.labelSubtext)})</Text>
          )}
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          value={value}
          {...(text.placeholder
            ? { placeholder: t(text.placeholder, { ns: text.namespace }) }
            : {})}
          placeholderStyle={{ color: theme.text }}
          selectedTextStyle={{ color: theme.text }}
          itemTextStyle={{ color: theme.text }}
          containerStyle={{
            backgroundColor: theme.card,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.accent,
          }}
          itemContainerStyle={{
            backgroundColor: theme.card,
            borderRadius: 8,
          }}
          activeColor={theme.accent}
          onChange={(item) => setValue(item.value)}
        />
        {text.helperText && (
          <Text style={styles.helperText}>
            {t(text.helperText, { ns: text.namespace })}
          </Text>
        )}
      </View>
    );
  }
);

export default DropdownSelector;
