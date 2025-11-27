import { useEffect, useMemo } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';

import { NavigationProps, RootStackParamList } from '@/types/navigation';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_TEST_ID } from '@/constants/adId';
import { getPassportEntryStyles } from '@/styles/passportEntry';
import { RouteProp, useRoute } from '@react-navigation/native';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import flags from '@/assets/images/flags';

const PassportEntryScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'passportEntry'>>();
  const { t } = useTranslation('passport');
  const { theme } = useTheme();
  const styles = useMemo(() => getPassportEntryStyles(theme), [theme]);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;
  const { entry } = route.params;
  const localisedCountry = t(
    `countries.${toJsonKeyFormat(entry.countryName)}`,
    {
      ns: 'data',
    }
  );

  useEffect(() => {
    navigation.setOptions({
      title: localisedCountry,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={flags[entry.countryCode.toLowerCase()]}
            contentFit="contain"
            style={{
              width: '100%',
              alignSelf: 'center',
              aspectRatio: 16 / 9,
            }}
          />
          <Text
            style={{
              color: theme.text,
              fontSize: 16,
              fontFamily: 'DMSansBold',
            }}
          >
            {localisedCountry}
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: theme.text,
              fontSize: 14,
              fontFamily: 'DMSans',
            }}
          >
            Times seen: {entry.correctTotal + entry.incorrectTotal}
          </Text>
          <Text
            style={{
              color: theme.text,
              fontSize: 14,
              fontFamily: 'DMSans',
            }}
          >
            Guess rate:{' '}
            {(
              (entry.correctTotal /
                (entry.incorrectTotal + entry.correctTotal)) *
              100
            ).toFixed(1)}
            %
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'DMSansBold',
              color: theme.text,
            }}
          >
            Adoption
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'DMSans',
              color: theme.text,
            }}
          >
            TBA
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'DMSansBold',
              color: theme.text,
            }}
          >
            Design
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'DMSans',
              color: theme.text,
            }}
          >
            TBA
          </Text>
        </View>
      </ScrollView>
      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaView>
  );
};

export default PassportEntryScreen;
