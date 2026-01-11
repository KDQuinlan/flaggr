import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { getNoticeBoardStyles } from '@/styles/noticeBoard';
import { useTheme } from '@/context/ThemeContext';
import { BANNER_HOME_AND_SETTINGS_ID, BANNER_TEST_ID } from '@/constants/adId';
import AdBanner from '@/components/AdBanner/AdBanner';
import stateStore from '@/state/store';
import { colors } from '@/components/colors';
import {
  INoticeBoardEntryProps,
  noticeBoardEntryData,
  NoticeBoardUpdateTypes,
} from '@/data/noticeBoardEntries';

const NoticeBoardEntry = ({
  title,
  date,
  updateType,
  image,
}: INoticeBoardEntryProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getNoticeBoardStyles(theme), [theme]);

  const handleUpdateTypePillColor = (
    updateType: NoticeBoardUpdateTypes
  ): string => {
    if (updateType === 'Major Update') return colors.crimsonRed;
    if (updateType === 'New Feature') return colors.royalBlue;
    if (updateType === 'Improvement') return colors.emeraldGreen;
    if (updateType === 'News') return colors.amberOrange;
    return colors.purpleViolet;
  };

  return (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => [
        styles.noticeBoardEntryContainer,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      {image && <Image source={image} style={styles.noticeBoardEntryImage} />}
      <View
        style={{
          ...styles.noticeBoardEntryTextContainer,
          borderTopLeftRadius: image ? 0 : 8,
          borderTopRightRadius: image ? 0 : 8,
        }}
      >
        <Text style={styles.noticeBoardEntryTitleText}>{title}</Text>
        <View style={styles.noticeBoardEntrySubtextContainer}>
          <View
            style={{
              ...styles.noticeBoardEntryPillContainer,
              backgroundColor: handleUpdateTypePillColor(updateType),
            }}
          >
            <Text style={styles.noticeBoardEntryText}>{updateType}</Text>
          </View>
          <Text style={styles.noticeBoardEntryText}>
            {new Intl.DateTimeFormat('en-GB').format(new Date(date))}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const NoticeBoard = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = useMemo(() => getNoticeBoardStyles(theme), [theme]);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const { isPremiumUser } = stateStore((s) => s.userSettings);
  const showAds = !isPremiumUser && isInternetAvailable;

  return (
    <SafeAreaProvider
      style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {noticeBoardEntryData.map((entry, index) => (
          <NoticeBoardEntry key={index} {...entry} />
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

export default NoticeBoard;
