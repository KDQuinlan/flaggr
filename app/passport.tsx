import { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Searchbar } from 'react-native-paper';
import { Image } from 'expo-image';

import { NavigationProps } from '@/types/navigation';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_TEST_ID } from '@/constants/adId';
import { Passport, PassportEntry } from '@/types/secureStore';
import { getPassportStyles } from '@/styles/passport';
import flags from '@/assets/images/flags';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';

const PassportScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('passport');
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getPassportStyles(theme), [theme]);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userProgression = stateStore((s) => s.userProgress);
  const userSettings = stateStore((s) => s.userSettings);
  const [passport, setPassport] = useState<Passport>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;

  useEffect(() => {
    navigation.setOptions({ title: t('title') });
  }, [navigation]);

  useEffect(() => {
    setPassport(
      userProgression.passport.filter((search: PassportEntry) =>
        search.countryName.includes(searchTerm)
      )
    );
  }, [userProgression, searchTerm]);

  // Equally divide width - horizontal margin - gap / between amount that can be rendered
  const PASSPORT_CARD_WIDTH = (width - 40 - 10) / Math.floor(width / 150);

  const PassportCard = (passportEntry: PassportEntry) => (
    <Pressable
      onPress={() =>
        navigation.navigate('passportEntry', { entry: passportEntry })
      }
      style={({ pressed }) => [
        styles.passportCard,
        { opacity: pressed ? 0.7 : 1, width: PASSPORT_CARD_WIDTH },
      ]}
    >
      <Image
        source={flags[passportEntry.countryCode.toLowerCase()]}
        contentFit="contain"
        style={styles.passportCardImage}
      />
      <Text style={styles.passportCardText}>
        {t(`countries.${toJsonKeyFormat(passportEntry.countryName)}`, {
          ns: 'data',
        })}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      {userProgression.passport.length === 0 ? (
        <View style={styles.emptyPassportContainer}>
          <Text style={styles.emptyPassportTitleText}>{t('emptyTitle')}</Text>
          <Text style={styles.emptyPassportText}>{t('emptyText')}</Text>
        </View>
      ) : (
        <View style={styles.screenContainer}>
          <Searchbar
            placeholder={t('search')}
            placeholderTextColor={theme.text}
            onChangeText={setSearchTerm}
            value={searchTerm}
            iconColor={theme.headerText}
            inputStyle={{ color: theme.text }}
            onClearIconPress={() => setSearchTerm('')}
            style={styles.searchInput}
          />

          <FlatList
            data={passport}
            keyExtractor={(item) => item.countryName}
            renderItem={({ item }) => <PassportCard {...item} />}
            numColumns={Math.floor(width / 150)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            columnWrapperStyle={{ gap: 10 }}
          />
        </View>
      )}

      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaView>
  );
};

export default PassportScreen;
