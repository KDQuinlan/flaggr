import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';
import { gameSelectStyles as styles } from './gameSelect.styles';
import en from '@/locales/en';
import iconsMap from '@/assets/images/icons';

type GameSelectProps = {
  title: string;
  description: string;
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
};

const GameSelect: React.FC<GameSelectProps> = ({
  title,
  description,
  icon,
  onPress,
}) => {
  const isLocked = description === en.games.states.locked;

  return (
    <TouchableOpacity
      style={styles.gameModeContainer}
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GameSelect;
