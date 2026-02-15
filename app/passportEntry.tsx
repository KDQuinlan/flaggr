import { useEffect, useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationProps, RootStackParamList } from '@/types/navigation';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_PASSPORT_ID, BANNER_TEST_ID } from '@/constants/adId';
import { getPassportEntryStyles } from '@/styles/passportEntry';
import { RouteProp, useRoute } from '@react-navigation/native';
import flags from '@/assets/images/flags';
import { MAXIMUM_DIFFICULTY } from '@/constants/common';
import formatPercent from '@/util/formatPercent/formatPercent';

// TODO - add banner text that content is only available in English

const PassportEntryScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'passportEntry'>>();
  const { t } = useTranslation('passportEntry');
  const { theme } = useTheme();
  const styles = useMemo(() => getPassportEntryStyles(theme), [theme]);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;
  const { entry } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: entry.countryName,
    });
  }, [navigation]);

  return (
    <SafeAreaProvider style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.flagTitleContainer}>
          <Image
            source={flags[entry.countryCode.toLowerCase()]}
            contentFit="contain"
            style={styles.icon}
          />
          <Text style={styles.title}>{entry.countryName}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>
            Difficulty: {`${entry.difficulty} / ${MAXIMUM_DIFFICULTY}`}
          </Text>
          <Text style={styles.text}>
            Times Answered: {entry.correctTotal + entry.incorrectTotal}
          </Text>
          <Text style={styles.text}>
            Guess Rate:{' '}
            {formatPercent(
              (entry.correctTotal /
                (entry.incorrectTotal + entry.correctTotal)) *
                100 || 0
            )}
            %
          </Text>
        </View>
        <View>
          <Text style={styles.title}>
            {t(`${entry.countryCode.toLowerCase()}.adoptionTitle`)}
          </Text>
          <Text style={styles.text}>
            {t(`${entry.countryCode.toLowerCase()}.adoption`)}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>
            {t(`${entry.countryCode.toLowerCase()}.symbolismTitle`)}
          </Text>
          <Text style={styles.text}>
            {t(`${entry.countryCode.toLowerCase()}.symbolism`)}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>
            {t(`${entry.countryCode.toLowerCase()}.historyTitle`)}
          </Text>
          <Text style={styles.text}>
            {t(`${entry.countryCode.toLowerCase()}.history`)}
          </Text>
        </View>
      </ScrollView>
      {showAds && (
        <AdBanner adId={__DEV__ ? BANNER_TEST_ID : BANNER_PASSPORT_ID} />
      )}
    </SafeAreaProvider>
  );
};

export default PassportEntryScreen;
