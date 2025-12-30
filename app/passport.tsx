import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
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
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { NavigationProps } from '@/types/navigation';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_PASSPORT_ID, BANNER_TEST_ID } from '@/constants/adId';
import { Passport } from '@/types/secureStore';
import { getPassportStyles } from '@/styles/passport';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import { GAME_DIFFICULTIES, VALID_REGIONS } from '@/constants/common';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DIFFICULTY_ID_TO_LEVEL_KEYS_MAP } from '@/constants/mappers';
import countriesData from '@/assets/data/countries.json';
import InformationButton from '@/components/passport/informationButton';
import PassportCard from '@/components/passport/passportCard';
import InformationModal from '@/components/passport/informationModal';
import { colors } from '@/components/colors';

interface BasicEntry {
  countryName: string;
  continent: string;
  difficulty: number;
}

const PassportScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('passport');
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getPassportStyles(theme), [theme]);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userProgression = stateStore((s) => s.userProgress);
  const userSettings = stateStore((s) => s.userSettings);
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;
  const [passport, setPassport] = useState<Passport>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [continentFilter, setContinentFilter] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<number[]>([]);
  const [informationModal, setInformationModal] = useState<boolean>(false);
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [filteredResultsAmount, setFilteredResultsAmount] = useState<number>(
    countriesData.length
  );

  const passportCardAmountWithoutSpacing = Math.floor((width - 40) / 150);
  const passportCardAllowance = Math.floor(
    (width - passportCardAmountWithoutSpacing * 20) / 150
  );

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const [activeTab, setActiveTab] = useState(0);

  const handleInfoPress = useCallback(() => {
    setInformationModal((prev) => !prev);
  }, []);

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

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaProvider
          style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}
        >
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
                renderItem={({ item }) => (
                  <PassportCard
                    passportEntry={item}
                    width={PASSPORT_CARD_WIDTH}
                  />
                )}
                numColumns={passportCardAllowance}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatlistContainer}
                columnWrapperStyle={{ gap: 10 }}
                ListHeaderComponent={
                  <InformationButton
                    onPress={handleInfoPress}
                    passportLength={passport.length}
                    filteredResultsAmount={filteredResultsAmount}
                  />
                }
              />

              <InformationModal
                informationModal={informationModal}
                closeInformationModal={handleInfoPress}
              />

              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={{ backgroundColor: theme.background }}
                handleIndicatorStyle={{ backgroundColor: colors.bluePrimary }}
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
                            styles.filterModalContentContainer,
                            {
                              opacity: pressed ? 0.7 : 1,
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
                            color={colors.bluePrimary}
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
                            styles.filterModalContentContainer,
                            {
                              opacity: pressed ? 0.7 : 1,
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
                            color={colors.bluePrimary}
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

          {showAds && (
            <AdBanner adId={__DEV__ ? BANNER_TEST_ID : BANNER_PASSPORT_ID} />
          )}
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default PassportScreen;
