import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { gameSelectStyles as styles } from './gameSelect.styles';
import iconsMap from '@/assets/images/icons';
import { PlayableGameModes } from '@/types/navigation';

type GameSelectProps = {
  id: PlayableGameModes;
  title: string;
  description: string;
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
};

const GameSelect: React.FC<GameSelectProps> = ({
  id,
  title,
  description,
  icon,
  onPress,
}) => {
  const { t } = useTranslation('home');
  return (
    <TouchableOpacity
      style={styles.gameModeContainer}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={t(`${id}.title`)}
    >
      <Image
        style={{ height: 48, width: 48, marginRight: 10 }}
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
