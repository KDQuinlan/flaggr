import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import { Dropdown } from 'react-native-element-dropdown';

import { colors } from '@/components/colors';
import { NavigationProps } from '@/types/navigation';
import { LANGUAGES } from '@/constants/common';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import stateStore from '@/state/store';

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const userSettings = stateStore((state) => state.userSettings);
  const { t } = useTranslation('settings');
  const [language, setLanguage] = useState<string>(userSettings.locale);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    persistUserSettings({ ...userSettings, locale: language });
  }, [language]);

  useEffect(() => {
    navigation.setOptions({
      title: t('title'),
    });
  }, [navigation, language]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
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

        <TouchableOpacity
          onPress={() => navigation.navigate('home')}
          style={styles.button}
          activeOpacity={0.8}
          accessibilityLabel={t('continue')}
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

export default SettingsScreen;
