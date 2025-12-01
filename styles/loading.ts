import { Appearance, StyleSheet } from 'react-native';

import { colors } from '@/components/colors';

export const getLoadingStyles = () => {
  const systemScheme = Appearance.getColorScheme();
  const isSystemDark = systemScheme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isSystemDark ? colors.black : colors.offWhite,
    },
    text: {
      fontFamily: 'DMSansBold',
      marginTop: 12,
      fontSize: 16,
      color: isSystemDark ? colors.white : colors.black,
    },
  });
};
