import { useEffect, useMemo } from 'react';
import { ScrollView, Pressable, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import DifficultySelect from '@/components/difficultySelect/difficultySelect';
import {
  RAPID_TIME_ALLOWANCE_IN_S,
  TO_PERCENTAGE_MULTIPLIER,
} from '@/constants/common';
import { NavigationProps, RootStackParamList } from '@/types/navigation';
import stateStore from '@/state/store';
import generateMultipleChoice from '@/util/generateMultipleChoiceQuestions/generateMultipleChoice';
import getCompletionDescription from '@/util/getCompletionDescription/getCompletionDescription';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import determineSetTimestamp from '@/util/determineSetTimestamp/determineSetTimestamp';
import { getDifficultyStyles } from '@/styles/difficulty';
import { useTheme } from '@/context/ThemeContext';
import AdBanner from '@/components/AdBanner/AdBanner';
import { BANNER_DIFFICULTY_SELECT_ID, BANNER_TEST_ID } from '@/constants/adId';

const Difficulty = () => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<RootStackParamList, 'difficulty'>>();
  const { t } = useTranslation('difficulty');
  const { theme } = useTheme();
  const styles = useMemo(() => getDifficultyStyles(theme), [theme]);
  const isInternetAvailable = stateStore((s) => s.isInternetAvailable);
  const userProgression = stateStore((s) => s.userProgress);
  const userSettings = stateStore((s) => s.userSettings);
  const showAds = !userSettings.isPremiumUser && isInternetAvailable;
  const { energyAmount, isPremiumUser } = userSettings;
  const setEnergyModalVisible = stateStore((s) => s.setEnergyModalVisible);

  const { id, title } = route.params;
  const progression = userProgression.games[id];

  const shouldUserSeePractice = userProgression.passport.length >= 5;

  const practiceItems = shouldUserSeePractice
    ? userProgression.passport.sort(
        (a, b) =>
          a.correctTotal / (a.correctTotal + a.incorrectTotal) -
          b.correctTotal / (b.correctTotal + b.incorrectTotal)
      )
    : null;

  useEffect(() => {
    navigation.setOptions({ title: t(`titles.${title.toLowerCase()}`) });
  }, [navigation]);

  const handleOnPress = (
    multipleChoiceScreenProps: RootStackParamList['multipleChoice']
  ) => {
    const { title, gameMode, questions, timeLimit } = multipleChoiceScreenProps;

    if (energyAmount === 0 && !isPremiumUser) {
      setEnergyModalVisible(true);
    } else {
      navigation.navigate('multipleChoice', {
        title,
        gameMode,
        questions,
        timeLimit,
      });

      if (!isPremiumUser) {
        persistUserSettings({
          ...userSettings,
          energyAmount: energyAmount - 1,
          lastEnergyTimestamp: determineSetTimestamp(),
        });
      }
    }
  };

  return (
    <SafeAreaProvider
      style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {id === 'standard' && practiceItems && (
          <Pressable
            style={({ pressed }) => [
              styles.practiceContainer,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            accessibilityLabel={t('practice')}
            accessibilityHint={t('practiceHint')}
            accessibilityRole="button"
            onPress={() =>
              handleOnPress({
                title: 'Practice',
                gameMode: 'practice',
                questions:
                  practiceItems.length > 10
                    ? practiceItems.slice(0, 10)
                    : practiceItems,
                timeLimit: 0,
              })
            }
          >
            <Text style={styles.practiceText}>{t('practice')}</Text>
          </Pressable>
        )}
        {Object.entries(progression).map(([levelKey, levelData]) => (
          <DifficultySelect
            key={levelKey}
            title={levelData.name}
            description={getCompletionDescription(levelData)}
            icon={levelKey}
            gameMode={id}
            advancementRequirement={levelData.advancementRequirement}
            progress={
              id === 'rapid'
                ? levelData.userScore / levelData.advancementRequirement
                : levelData.userScore / TO_PERCENTAGE_MULTIPLIER
            }
            score={levelData.userScore}
            onPress={() =>
              handleOnPress({
                title: levelData.name,
                gameMode: id,
                questions: generateMultipleChoice(
                  levelData.id,
                  levelData.length
                ),
                timeLimit: id === 'rapid' ? RAPID_TIME_ALLOWANCE_IN_S : 0,
              })
            }
          />
        ))}
      </ScrollView>
      {showAds && (
        <AdBanner
          adId={__DEV__ ? BANNER_TEST_ID : BANNER_DIFFICULTY_SELECT_ID}
        />
      )}
    </SafeAreaProvider>
  );
};

export default Difficulty;
