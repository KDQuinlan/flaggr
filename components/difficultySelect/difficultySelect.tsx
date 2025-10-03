import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { difficultySelectStyles as styles } from './difficultySelect.styles';
import en from '@/locales/en';
import { colors } from '../colors';
import { LEVEL_TO_FLAG_AMOUNT_MAP } from '@/constants/mappers';
import { LevelKeys, Levels } from '@/state/secureStoreStructure';
import iconsMap from '@/assets/images/icons';

type DifficultySelectProps = {
  title: Levels;
  description: string;
  gameMode: string;
  icon: string;
  score: number;
  progress: number;
  advancementRequirement: number;
  onPress: (event: GestureResponderEvent) => void;
};

// TODO - remove hardcoded usage of 'rapid'

const DifficultySelect: React.FC<DifficultySelectProps> = ({
  title,
  description,
  gameMode,
  icon,
  score,
  progress,
  advancementRequirement,
  onPress,
}) => {
  const isLocked = description === en.games.states.locked;

  const hasRapidOverbar =
    gameMode === 'rapid' && score > advancementRequirement;

  const overProgress =
    (score - advancementRequirement) /
    (LEVEL_TO_FLAG_AMOUNT_MAP[title] - score);

  return (
    <TouchableOpacity
      style={{
        ...styles.gameModeContainer,
        backgroundColor: isLocked ? colors.offWhite : colors.white,
      }}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLocked}
    >
      <Image
        style={{ height: 56, width: 56, marginRight: 15 }}
        source={iconsMap[icon]}
      />
      <View style={styles.textContainer}>
        <View style={styles.gameDetailsContainer}>
          <View>
            <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
              {title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          </View>
          {description === 'Completed' && (
            <Text style={styles.score}>
              {gameMode === 'rapid' ? score : `${score}%`}
            </Text>
          )}
        </View>
        {score !== null && score !== undefined && advancementRequirement && (
          <ProgressBar
            progress={hasRapidOverbar ? overProgress : progress}
            color={
              hasRapidOverbar ? colors.legendaryOrange : colors.bluePrimary
            }
            style={{
              ...styles.progressBar,
              ...(hasRapidOverbar && { backgroundColor: colors.bluePrimary }),
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DifficultySelect;
