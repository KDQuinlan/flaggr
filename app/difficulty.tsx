import { useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
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

  useEffect(() => {
    navigation.setOptions({ title: t(`titles.${title.toLowerCase()}`) });
  }, [navigation]);

  return (
    <SafeAreaProvider
      style={{ ...styles.rootContainer, paddingBottom: insets.bottom }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
            onPress={() => {
              if (energyAmount === 0 && !isPremiumUser) {
                setEnergyModalVisible(true);
              } else {
                navigation.navigate('multipleChoice', {
                  title: levelData.name,
                  gameMode: id,
                  questions: generateMultipleChoice(
                    levelData.id,
                    levelData.length
                  ),
                  timeLimit: id === 'rapid' ? RAPID_TIME_ALLOWANCE_IN_S : 0,
                });

                if (!isPremiumUser) {
                  persistUserSettings({
                    ...userSettings,
                    energyAmount: energyAmount - 1,
                    lastEnergyTimestamp: determineSetTimestamp(),
                  });
                }
              }
            }}
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
