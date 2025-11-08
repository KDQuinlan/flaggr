import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';

import { colors } from '@/components/colors';
import { NavigationProps } from '@/types/navigation';

// TODO - remove on render state update?

const FeedbackScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation('feedback');
  const [type, setType] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const feedbackTypes = [
    { label: t('uiFeedback'), value: 'ui' },
    { label: t('progressionFeedback'), value: 'progression' },
    { label: t('gameplayFeedback'), value: 'gameplay' },
    { label: t('performanceFeedback'), value: 'performance' },
    { label: t('purchaseFeedback'), value: 'purchase' },
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
            onChange={(item) => setType(item.label)}
          />
        </View>

        <TextInput
          style={styles.textBox}
          placeholder={t('placeholder')}
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <Pressable
          onPress={handleSubmit}
          disabled={!type || message === ''}
          style={({ pressed }) => [
            styles.button,
            {
              opacity: !type || message === '' ? 0.5 : pressed ? 0.7 : 1,
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

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  textBox: {
    marginTop: 20,
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#0073E6',
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'DMSansBold',
  },
  optional: {
    fontWeight: '400',
    fontSize: 14,
    color: '#666',
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: colors.bluePrimary,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    maxWidth: 240,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'DMSansBold',
  },
  privacyPolicyText: {
    fontFamily: 'DMSans',
    textDecorationLine: 'underline',
    color: colors.blueSecondary,
  },
});

export default FeedbackScreen;
