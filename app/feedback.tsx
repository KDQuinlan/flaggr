import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';

import { NavigationProps } from '@/types/navigation';
import { useTheme } from '@/context/ThemeContext';
import { getFeedbackStyles } from '@/styles/feedback';

const FeedbackScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('feedback');
  const { theme } = useTheme();
  const styles = useMemo(() => getFeedbackStyles(theme), [theme]);
  const [type, setType] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const isDisabled = !type || message === '';

  const feedbackTypes = [
    { label: t('bugFeedback'), value: 'bug' },
    { label: t('ideaFeedback'), value: 'idea' },
    { label: t('designFeedback'), value: 'design' },
    { label: t('premeiumFeedback'), value: 'Premium' },
    { label: t('otherFeedback'), value: 'other' },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: t('title'),
    });
  }, [navigation]);

  const handleSubmit = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(t('errorTitle'), t('errorNotAvailable'));
        return;
      }

      await MailComposer.composeAsync({
        recipients: ['grimlangames@gmail.com'],
        subject: type!,
        body: message,
      });

      Alert.alert(t('successTitle'), t('successMessage'));
      setType(null);
      setMessage('');
    } catch (error) {
      console.error('Mail error:', error);
      Alert.alert(t('errorTitle'), t('errorMessage'));
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.label}>{t('reason')}</Text>
          <Dropdown
            style={styles.dropdown}
            data={feedbackTypes}
            placeholder={t('reasonPlaceholder')}
            labelField="label"
            valueField="label"
            value={type}
            placeholderStyle={{ color: theme.text }}
            selectedTextStyle={{ color: theme.text }}
            itemTextStyle={{ color: theme.text }}
            containerStyle={{
              backgroundColor: theme.card,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.accent,
            }}
            itemContainerStyle={{
              backgroundColor: theme.card,
              borderRadius: 8,
            }}
            activeColor={theme.accent}
            onChange={(item) => setType(item.label)}
          />
        </View>

        <TextInput
          style={styles.textBox}
          placeholder={t('placeholder')}
          placeholderTextColor={theme.text}
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <Pressable
          onPress={handleSubmit}
          disabled={isDisabled}
          style={({ pressed }) => [
            isDisabled ? styles.buttonDisabled : styles.buttonEnabled,
            {
              opacity: isDisabled ? 0.5 : pressed ? 0.7 : 1,
            },
          ]}
          accessibilityLabel={t('submit')}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{t('submit')}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedbackScreen;
