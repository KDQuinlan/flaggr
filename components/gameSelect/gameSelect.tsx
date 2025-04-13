import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { gameSelectStyles as styles } from './gameSelect.styles';
import en from '@/locales/en';
import { colors } from '../colors';

// TODO - Update progressBar param to be react component

type GameSelectProps = {
  title: string;
  description?: string;
  icon?: string;
  score?: string;
  progressBar?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

const GameSelect: React.FC<GameSelectProps> = ({
  title,
  description,
  icon,
  score,
  progressBar,
  onPress,
}) => {
  const isLocked = description === en.games.states.locked;

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
      <Ionicons
        name="checkmark-circle"
        size={32}
        color="green"
        style={styles.gameIcon}
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
          {score && <Text style={styles.score}>{`${score}%`}</Text>}
        </View>
        {progressBar !== null && progressBar !== undefined && (
          <ProgressBar
            progress={progressBar}
            color="blue"
            style={styles.progressBar}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GameSelect;
