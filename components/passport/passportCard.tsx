import React, { useMemo } from 'react';
import { Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@/context/ThemeContext';
import { getPassportStyles } from '@/styles/passport';
import flags from '@/assets/images/flags';
import { PassportEntry } from '@/types/secureStore';
import { NavigationProps } from '@/types/navigation';

interface IPassportCard {
  passportEntry: PassportEntry;
  width: number;
}

const PassportCard = React.memo(
  ({ passportEntry, width }: IPassportCard) => {
    const navigation = useNavigation<NavigationProps>();
    const { theme } = useTheme();

    const styles = useMemo(() => getPassportStyles(theme), [theme]);

    const handlePress = () => {
      navigation.navigate('passportEntry', { entry: passportEntry });
    };

    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.passportCard,
          {
            opacity: pressed ? 0.7 : 1,
            width,
          },
        ]}
      >
        <Image
          source={flags[passportEntry.countryCode.toLowerCase()]}
          contentFit="contain"
          style={styles.passportCardImage}
          cachePolicy="memory-disk"
        />
        <Text style={styles.passportCardText}>{passportEntry.countryName}</Text>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.passportEntry.countryCode ===
      nextProps.passportEntry.countryCode
    );
  }
);

export default PassportCard;
