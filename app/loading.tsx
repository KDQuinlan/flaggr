import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@/components/colors';

const Loading = () => {
  const { t } = useTranslation('loading');

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.bluePrimary} />
      <Text style={styles.text}>{t('loading')}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
  },
  text: {
    fontFamily: 'DMSansBold',
    marginTop: 12,
    fontSize: 16,
    color: colors.black,
  },
});
