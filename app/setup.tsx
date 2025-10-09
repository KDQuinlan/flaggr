import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import { Dropdown } from 'react-native-element-dropdown';
import * as Localization from 'expo-localization';

import { colors } from '@/components/colors';
import { NavigationProps } from '@/types/navigation';
import { LANGUAGES } from '@/constants/common';

const locales = Localization.getLocales();
const locale = locales[0].languageCode;

const SetupScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('setup');
  const [language, setLanguage] = useState<string>(locale ?? 'en');
  const [ageRange, setAgeRange] = useState(null);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const ageRanges = [
    { label: t('underAge'), value: '12' },
    { label: '13-15', value: '13-15' },
    { label: '16-17', value: '16-17' },
    { label: '18+', value: '18' },
    { label: t('preferNotToSay'), value: '0' },
  ];

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Flaggr</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>{t('language')}</Text>
          <Dropdown
            style={styles.dropdown}
            data={LANGUAGES}
            labelField="label"
            valueField="value"
            value={language}
            onChange={(item) => setLanguage(item.value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {t('ageRange')}{' '}
            <Text style={styles.optional}>({t('optional')})</Text>
          </Text>
          <Dropdown
            key={i18n.language}
            style={styles.dropdown}
            data={ageRanges}
            labelField="label"
            valueField="value"
            placeholder={t('selectAgeRange')}
            value={ageRange}
            onChange={(item) => setAgeRange(item.value)}
          />
          <Text style={styles.helperText}>{t('adHelpText')}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          accessibilityLabel="Continue"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{t('continue')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#0073E6',
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optional: {
    fontWeight: '400',
    fontSize: 14,
    color: '#666',
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  helperText: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
  button: {
    backgroundColor: colors.bluePrimary,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default SetupScreen;
