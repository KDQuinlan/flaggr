import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../colors';

type GameSelectProps = {
  title: string;
  description: string;
  icon?: string;
  navigateTo?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const GameSelect: React.FC<GameSelectProps> = ({
  title,
  description,
  icon,
  navigateTo,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.gameModeContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons
        name="checkmark-circle"
        size={32}
        color="green"
        style={styles.gameIcon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <ProgressBar progress={0.5} color="blue" style={styles.progressBar} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gameModeContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  gameIcon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.offBlack,
    flexWrap: 'wrap',
  },
  description: {
    color: colors.lightBlack,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  progressBar: {
    marginTop: 5,
    height: 5,
    borderRadius: 10,
    width: '100%',
  },
});

export default GameSelect;
