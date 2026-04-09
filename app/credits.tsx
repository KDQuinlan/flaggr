import { useMemo } from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeContext';
import { getCreditsStyles } from '@/styles/credits';
import flags from '@/assets/images/flags';

const Credits = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = useMemo(() => getCreditsStyles(theme), [theme]);

  return (
    <View style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={styles.creatorText}>Grimlan Games</Text>
        <View>
          <Text style={styles.headerText}>Testers</Text>
          <Text style={styles.text}>
            Thank you to everyone who participated in the test phase of Flaggr
          </Text>
        </View>

        <Text style={styles.text}>
          A special thanks to{' '}
          <Text style={{ fontFamily: 'DMSansBold' }}>Poetmari96</Text> for
          encouragement and a lot of valuable feedback during development!
        </Text>

        <Image
          source={flags['in']}
          contentFit="contain"
          style={styles.image}
          accessibilityLabel="Flag of India"
        />

        <View>
          <Text style={styles.headerText}>Resources</Text>
          <Text style={styles.text}>
            The below resources are courtesy of{' '}
            <Text
              style={styles.navLink}
              onPress={() => Linking.openURL('https://www.flaticon.com')}
            >
              flaticon
            </Text>
          </Text>
        </View>

        <Text style={styles.text}>
          Globe icons created by amonrat rungreangfangsai{'\n'}
          Flag icons created by Smashicons{'\n'}
          Rapid & podium, feedback, passport icons created by Freepik{'\n'}
          Ranking badge & game badge icons created by littleicon{'\n'}
          Energy icons created by nawicon{'\n'}
          Filter & information icons created by Anggara{'\n'}
          Fire icons created by Vectors Market{'\n'}
          Bell icons created by Pixel perfect{'\n'}
          Settings icons created by Fathema Khanom
        </Text>
      </ScrollView>
    </View>
  );
};

export default Credits;
