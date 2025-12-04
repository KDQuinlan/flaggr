import { useMemo } from 'react';
import { View, Text, ActivityIndicator, Appearance } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/components/colors';
import { getLoadingStyles } from '@/styles/loading';

const Loading = () => {
  const systemScheme = Appearance.getColorScheme();
  const isSystemDark = systemScheme === 'dark';
  const { t } = useTranslation('loading');
  const styles = useMemo(() => getLoadingStyles(), []);

  return (
    <View style={styles.container}>
      <StatusBar
        style={isSystemDark ? 'light' : 'dark'}
        backgroundColor={isSystemDark ? colors.black : colors.offWhite}
      />
      <ActivityIndicator size="large" color={colors.bluePrimary} />
      <Text style={styles.text}>{t('loading')}</Text>
    </View>
  );
};

export default Loading;
