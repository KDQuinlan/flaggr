import { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
  Modal,
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
import { TOTAL_FLAGS_AMOUNT } from '@/constants/common';

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
  const [informationModal, setInformationModal] = useState<boolean>(false);
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;

  const closeInformationModal = () => setInformationModal(false);

  useEffect(() => {
    navigation.setOptions({ title: t('title') });
  }, [navigation]);

  useEffect(() => {
    const localisedOrderedPassport = userProgression.passport
      .map((entry) => ({
        ...entry,
        countryName: t(`countries.${toJsonKeyFormat(entry.countryName)}`, {
          ns: 'data',
        }),
      }))
      .sort((a, b) => a.countryName.localeCompare(b.countryName));

    setPassport(
      localisedOrderedPassport.filter((entry: PassportEntry) =>
        entry.countryName.includes(searchTerm)
      )
    );
  }, [userProgression, searchTerm, userSettings]);

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
      <Text style={styles.passportCardText}>{passportEntry.countryName}</Text>
    </Pressable>
  );

  const InformationModal = () => (
    <Modal
      transparent
      animationType="fade"
      visible={informationModal}
      onRequestClose={closeInformationModal}
    >
      <Pressable onPress={closeInformationModal} style={styles.modalBackdrop}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContainer}
        >
          <Text style={styles.titleText}>{t('title')}</Text>
          <Text style={styles.text}>{t('informationModalUnlock')}</Text>
          <Text style={styles.text}>{t('informationModalFilter')}</Text>
          <Pressable
            onPress={closeInformationModal}
            style={({ pressed }) => [
              styles.closeButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={styles.closeButtonText}>{t('close')}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );

  const InformationButton = () => (
    <Pressable
      onPress={() => setInformationModal(!informationModal)}
      style={({ pressed }) => [
        styles.totalInformationButton,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={styles.totalText}>
        {`${passport.length} / ${TOTAL_FLAGS_AMOUNT}`}
      </Text>
      <Image
        style={{ width: 20, height: 20 }}
        source={require('@/assets/images/icons/resources/information.png')}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      {userProgression.passport.length === 0 ? (
        <View style={styles.emptyPassportContainer}>
          <Text style={styles.titleText}>{t('emptyTitle')}</Text>
          <Text style={styles.text}>{t('emptyText')}</Text>
        </View>
      ) : (
        <View style={styles.screenContainer}>
          <View style={styles.searchFilterContainer}>
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
            <Pressable
              hitSlop={10}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <Image
                style={{ width: 35, height: 35 }}
                source={require('@/assets/images/icons/resources/filter.png')}
              />
            </Pressable>
          </View>

          <FlatList
            data={passport}
            keyExtractor={(item) => item.countryName}
            renderItem={({ item }) => <PassportCard {...item} />}
            numColumns={Math.floor(width / 150)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlistContainer}
            columnWrapperStyle={{ gap: 10 }}
            ListHeaderComponent={<InformationButton />}
          />

          <InformationModal />
        </View>
      )}

      {showAds && <AdBanner adId={BANNER_TEST_ID} />}
    </SafeAreaView>
  );
};

export default PassportScreen;
