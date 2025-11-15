import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { getDifficultySelectStyles } from './difficultySelect.styles';
import { colors } from '../colors';
import { LEVEL_MAP, LEVEL_TO_FLAG_AMOUNT_MAP } from '@/constants/mappers';
import iconsMap from '@/assets/images/icons';
import { Levels } from '@/types/secureStore';
import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

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
  const { t } = useTranslation(['difficulty', 'data']);
  const { theme } = useTheme();
  const styles = useMemo(() => getDifficultySelectStyles(theme), [theme]);

  const isLocked = description === t('states.locked');
  const hasRapidOverbar =
    gameMode === 'rapid' && score > advancementRequirement;

  const overProgress =
    (score - advancementRequirement) /
    (LEVEL_TO_FLAG_AMOUNT_MAP[title] - score);

  return (
    <TouchableOpacity
      style={{
        ...styles.gameModeContainer,
        opacity: isLocked ? 0.5 : 1,
      }}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLocked}
      accessibilityRole="button"
      accessibilityLabel={t(`levels.${LEVEL_MAP[title]}`, {
        level: t('title', { ns: 'data' }),
      })}
    >
      <Image
        style={{ height: 56, width: 56, marginRight: 10 }}
        source={iconsMap[icon]}
      />
      <View style={styles.textContainer}>
        <View style={styles.gameDetailsContainer}>
          <View>
            <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
              {t(`levels.${LEVEL_MAP[title]}`, { ns: 'data' })}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          </View>
          {(description === 'Completed' || description === 'Perfected') && (
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
