import { colors } from '@/components/colors';
import { NavigationProps } from '@/types/navigation';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import RouterParamList from './types';

const MultipleChoice = () => {
  const navigation = useNavigation<NavigationProps>();
  const { name } = useLocalSearchParams<RouterParamList['multipleChoice']>();

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation]);
  return (
    <SafeAreaView>
      <View style={styles.flagContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  flagContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default MultipleChoice;
