import React, { useMemo } from 'react';
import { View, Text, GestureResponderEvent, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';

import iconsMap from '@/assets/images/icons';
import { HomeScreenNavigableScreens } from '@/types/navigation';
import { useTheme } from '@/context/ThemeContext';
import { getGameSelectStyles } from './gameSelect.styles';

type GameSelectProps = {
  id: HomeScreenNavigableScreens;
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
  const { theme } = useTheme();
  const styles = useMemo(() => getGameSelectStyles(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.gameModeContainer,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
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
    </Pressable>
  );
};

export default GameSelect;
