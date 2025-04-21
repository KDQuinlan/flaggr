import Ionicons from '@expo/vector-icons/Ionicons';
import React, { ReactElement } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { gameSelectStyles as styles } from './gameSelect.styles';
import en from '@/locales/en';
import { colors } from '../colors';
import StandardIcon from '@/assets/images/gamemode-standard.svg';

// TODO - Update progressBar param to be react component

type GameSelectProps = {
  title: string;
  description?: string;
  icon?: ReactElement;
  score?: string;
  progress?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

const GameSelect: React.FC<GameSelectProps> = ({
  title,
  description,
  icon,
  score,
  progress,
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
      {/* <Image
        style={{ height: 32, width: 32, marginRight: 15 }}
        source={require('@/assets/images/gamemodeStandard/gamemode-standard.png')}
      /> */}
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
        {progress !== null && progress !== undefined && (
          <ProgressBar
            progress={progress}
            color="blue"
            style={styles.progressBar}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GameSelect;
