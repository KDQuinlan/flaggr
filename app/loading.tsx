import { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '@/components/colors';
import { getLoadingStyles } from '@/styles/loading';
import { useTheme } from '@/context/ThemeContext';

const Loading = () => {
  const { t } = useTranslation('loading');
  const { theme } = useTheme();
  const styles = useMemo(() => getLoadingStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.bluePrimary} />
      <Text style={styles.text}>{t('loading')}</Text>
    </View>
  );
};

export default Loading;
