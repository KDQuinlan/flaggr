import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import { getPassportStyles } from '@/styles/passport';

interface IInformationProps {
  onPress: () => void;
  passportLength: number;
  filteredResultsAmount: number;
}

const InformationButton = React.memo(
  ({ onPress, passportLength, filteredResultsAmount }: IInformationProps) => {
    const { t } = useTranslation('passport');
    const { theme } = useTheme();
    const styles = useMemo(() => getPassportStyles(theme), [theme]);

    return (
      <View>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.totalInformationButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={styles.totalText}>
            {`${passportLength} / ${filteredResultsAmount}`}
          </Text>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('@/assets/images/icons/resources/information.png')}
          />
        </Pressable>

        {passportLength === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.titleText}>{t('noResultsTitle')}</Text>
            <Text style={styles.text}>
              {t('noResultsText', { value: filteredResultsAmount })}
            </Text>
          </View>
        )}
      </View>
    );
  }
);

export default InformationButton;
