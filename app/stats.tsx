import { useEffect, useMemo } from 'react';
import { useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';

import { NavigationProps, RootStackParamList } from '@/types/navigation';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_HOME_AND_SETTINGS_ID, BANNER_TEST_ID } from '@/constants/adId';
import stateStore from '@/state/store';
import { useTheme } from '@/context/ThemeContext';
import formatPercent from '@/util/formatPercent/formatPercent';
import flags from '@/assets/images/flags';
import toJsonKeyFormat from '@/util/toJsonKeyFormat/toJsonKeyFormat';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { getStatsStyles } from '@/styles/stats';

const StatsScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userSettings = stateStore((s) => s.userSettings);
  const { isPremiumUser } = userSettings;
  const route = useRoute<RouteProp<RootStackParamList, 'stats'>>();
  const { title, sortedPassport } = route.params;
  const { t } = useTranslation('profile');
  const { theme } = useTheme();
  const styles = useMemo(() => getStatsStyles(theme), [theme]);

  const showAds = !isPremiumUser && isInternetAvailable;

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaProvider style={styles.rootContainer}>
          <FlatList
            data={sortedPassport}
            keyExtractor={(item) => item.countryName}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => {
              const answeredTotal = item.correctTotal + item.incorrectTotal;

              return (
                <View style={styles.statsContainer}>
                  <View style={{ flex: 1 }}>
                    <Image
                      contentFit="contain"
                      style={styles.statsImage}
                      source={flags[item.countryCode.toLowerCase()]}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.statsSubHeaderText}>
                      {t(`countries.${toJsonKeyFormat(item.countryName)}`, {
                        ns: 'data',
                      })}
                    </Text>
                    <Text style={styles.statsText}>
                      {t('guessRateText', {
                        percent: formatPercent(
                          (item.correctTotal / answeredTotal) * 100
                        ),
                      })}
                    </Text>
                    <Text style={styles.statsText}>
                      {answeredTotal === 1
                        ? t('timesAnsweredText')
                        : t('timesAnsweredPluralText', {
                            number: answeredTotal,
                          })}
                    </Text>
                  </View>
                </View>
              );
            }}
          />

          {showAds && (
            <AdBanner
              adId={__DEV__ ? BANNER_TEST_ID : BANNER_HOME_AND_SETTINGS_ID}
            />
          )}
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default StatsScreen;
