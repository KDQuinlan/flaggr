import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { BANNER_HOME_AND_SETTINGS_ID, BANNER_TEST_ID } from '@/constants/adId';
import AdBanner from '@/components/AdBanner/AdBanner';
import stateStore from '@/state/store';
import { getNoticeBoardEntryStyles } from '@/styles/noticeBoardEntry';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { NoticeBoardContentSection } from '@/types/noticeBoard';

const ContentSection = (section: NoticeBoardContentSection) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getNoticeBoardEntryStyles(theme), [theme]);

  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.headerText}>{section.header}</Text>
      <Text style={styles.text}>{section.text}</Text>
    </View>
  );
};

const NoticeBoardEntry = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<RootStackParamList, 'noticeBoardEntry'>>();
  const { theme } = useTheme();
  const styles = useMemo(() => getNoticeBoardEntryStyles(theme), [theme]);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const { isPremiumUser } = stateStore((s) => s.userSettings);
  const showAds = !isPremiumUser && isInternetAvailable;
  const { title, image, date, content } = route.params.entry;

  const visualDate = new Intl.DateTimeFormat('en-GB').format(new Date(date));
  const spokenDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
  }).format(new Date(date));

  return (
    <SafeAreaProvider
      style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}
        >
          {image && (
            <Image accessible={false} source={image} style={styles.image} />
          )}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.titleText}>{title}</Text>
            <Text accessibilityLabel={spokenDate} style={styles.text}>
              {visualDate}
            </Text>
          </View>
        </View>

        {content.map((section, index) => (
          <ContentSection key={index} {...section} />
        ))}
      </ScrollView>

      {showAds && (
        <AdBanner
          adId={__DEV__ ? BANNER_TEST_ID : BANNER_HOME_AND_SETTINGS_ID}
        />
      )}
    </SafeAreaProvider>
  );
};

export default NoticeBoardEntry;
