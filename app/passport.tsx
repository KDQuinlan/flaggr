import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { Searchbar, Checkbox } from 'react-native-paper';
import { Image } from 'expo-image';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import { NavigationProps } from '@/types/navigation';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_TEST_ID } from '@/constants/adId';
import { Passport, PassportEntry } from '@/types/secureStore';
import { getPassportStyles } from '@/styles/passport';
import flags from '@/assets/images/flags';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import { GAME_DIFFICULTIES, VALID_REGIONS } from '@/constants/common';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DIFFICULTY_ID_TO_LEVEL_KEYS_MAP } from '@/constants/mappers';
import countriesData from '@/assets/data/countries.json';

interface BasicEntry {
  countryName: string;
  continent: string;
  difficulty: number;
}

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
  const [continentFilter, setContinentFilter] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<number[]>([]);
  const [informationModal, setInformationModal] = useState<boolean>(false);
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [filteredResultsAmount, setFilteredResultsAmount] = useState<number>(
    countriesData.length
  );
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;

  const passportCardAmountWithoutSpacing = Math.floor((width - 40) / 150);
  const passportCardAllowance = Math.floor(
    (width - passportCardAmountWithoutSpacing * 20) / 150
  );

  const closeInformationModal = () => setInformationModal(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const [activeTab, setActiveTab] = useState(0);

  const handleSheetChanges = useCallback((index: number) => {
    setFilterModal(index >= 0);
  }, []);

  const handleToggleModalPress = useCallback(() => {
    if (filterModal) {
      bottomSheetModalRef.current?.dismiss();
    } else {
      bottomSheetModalRef.current?.present();
    }
  }, [filterModal]);

  const matchesFilters = <T extends BasicEntry>(entry: T) => {
    const matchesSearch = entry.countryName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesContinent =
      continentFilter.length === 0 || continentFilter.includes(entry.continent);

    const matchesDifficulty =
      difficultyFilter.length === 0 ||
      difficultyFilter.includes(entry.difficulty);

    return matchesSearch && matchesContinent && matchesDifficulty;
  };

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

    setFilteredResultsAmount(countriesData.filter(matchesFilters).length);
    setPassport(localisedOrderedPassport.filter(matchesFilters));
  }, [
    userProgression,
    searchTerm,
    userSettings,
    continentFilter,
    difficultyFilter,
  ]);

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
    <View>
      <Pressable
        onPress={() => setInformationModal(!informationModal)}
        style={({ pressed }) => [
          styles.totalInformationButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.totalText}>
          {`${passport.length} / ${filteredResultsAmount}`}
        </Text>
        <Image
          style={{ width: 20, height: 20 }}
          source={require('@/assets/images/icons/resources/information.png')}
        />
      </Pressable>

      {passport.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.titleText}>{t('noResultsTitle')}</Text>
          <Text style={styles.text}>
            {t('noResultsText', { value: filteredResultsAmount })}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
                  onPress={handleToggleModalPress}
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
                numColumns={passportCardAllowance}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatlistContainer}
                columnWrapperStyle={{ gap: 10 }}
                ListHeaderComponent={<InformationButton />}
              />

              <InformationModal />

              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={{ backgroundColor: theme.background }}
                onChange={handleSheetChanges}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.filterModalTitleRoot}>
                    <Pressable
                      onPress={() => setActiveTab(0)}
                      style={({ pressed }) => [
                        styles.filterModalTitleContainer,
                        {
                          opacity: pressed ? 0.7 : 1,
                          borderBottomWidth: activeTab === 0 ? 2 : 0,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: activeTab === 0 ? 'DMSansBold' : 'DMSans',
                          color: theme.text,
                        }}
                      >
                        {t('continents')}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => setActiveTab(1)}
                      style={({ pressed }) => [
                        styles.filterModalTitleContainer,
                        {
                          opacity: pressed ? 0.7 : 1,
                          borderBottomWidth: activeTab === 1 ? 2 : 0,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: activeTab === 1 ? 'DMSansBold' : 'DMSans',
                          color: theme.text,
                        }}
                      >
                        {t('difficulty')}
                      </Text>
                    </Pressable>
                  </View>

                  {activeTab === 0 ? (
                    <BottomSheetScrollView
                      contentContainerStyle={{ padding: 20 }}
                    >
                      {VALID_REGIONS.map((region) => (
                        <Pressable
                          key={region}
                          style={({ pressed }) => [
                            {
                              opacity: pressed ? 0.7 : 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingBottom: 15,
                            },
                          ]}
                          onPress={() =>
                            setContinentFilter((prev) =>
                              prev.includes(region)
                                ? prev.filter((d) => d !== region)
                                : [...prev, region]
                            )
                          }
                        >
                          <Checkbox
                            status={
                              continentFilter.includes(region)
                                ? 'checked'
                                : 'unchecked'
                            }
                          />
                          <Text style={styles.text}>
                            {t(
                              `regions.${toJsonKeyFormat(region.toLowerCase())}`,
                              {
                                ns: 'data',
                              }
                            )}
                          </Text>
                        </Pressable>
                      ))}
                    </BottomSheetScrollView>
                  ) : (
                    <BottomSheetScrollView
                      contentContainerStyle={{ padding: 20 }}
                    >
                      {GAME_DIFFICULTIES.map((difficulty) => (
                        <Pressable
                          key={difficulty}
                          style={({ pressed }) => [
                            {
                              opacity: pressed ? 0.7 : 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingBottom: 15,
                            },
                          ]}
                          onPress={() =>
                            setDifficultyFilter((prev) =>
                              prev.includes(difficulty)
                                ? prev.filter((d) => d !== difficulty)
                                : [...prev, difficulty]
                            )
                          }
                        >
                          <Checkbox
                            status={
                              difficultyFilter.includes(difficulty)
                                ? 'checked'
                                : 'unchecked'
                            }
                          />
                          <Text style={styles.text}>
                            {t(
                              `levels.${DIFFICULTY_ID_TO_LEVEL_KEYS_MAP[difficulty]}`,
                              { ns: 'data' }
                            )}
                          </Text>
                        </Pressable>
                      ))}
                    </BottomSheetScrollView>
                  )}
                </View>
              </BottomSheetModal>
            </View>
          )}

          {showAds && <AdBanner adId={BANNER_TEST_ID} />}
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default PassportScreen;
