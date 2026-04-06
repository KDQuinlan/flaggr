import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';

import { useTheme } from '@/context/ThemeContext';
import stateStore from '@/state/store';
import { colors } from '../colors';
import { getSwitchSettingStyles } from './getSwitchSettingStyles.styles';
import { UserSettingStructure } from '@/types/secureStore';
import persistUserSettings from '@/util/persistState/persistUserSettings';

interface ISwitchSettingProps {
  userSetting: 'isDarkTheme' | 'isImmersiveMode';
  label: string;
}

const SwitchSetting = React.memo(
  ({ userSetting, label }: ISwitchSettingProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getSwitchSettingStyles(theme), [theme]);
    const userSettings = stateStore((s) => s.userSettings);
    const newUserSettings: UserSettingStructure = {
      ...userSettings,
      [userSetting]: !userSettings[userSetting],
    };

    return (
      <View style={styles.sectionRow}>
        <Text style={styles.label}>{label}</Text>
        <Switch
          color={colors.blueSecondary}
          value={userSettings[userSetting]}
          onValueChange={() => persistUserSettings(newUserSettings)}
        />
      </View>
    );
  }
);

export default SwitchSetting;
