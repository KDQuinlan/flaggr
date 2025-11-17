import { StyleSheet, PixelRatio } from 'react-native';

import { ThemeColors } from '@/components/theme';

const fontScale = PixelRatio.getFontScale();

export const getEnergyDisplayStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    parentContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 20,
      height: 30,
      left: 10,
      zIndex: 1,
    },
    energyContainer: {
      minWidth: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.energy,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderTopLeftRadius: fontScale > 1.25 ? 8 : 0,
      borderBottomLeftRadius: fontScale > 1.25 ? 8 : 0,
      paddingHorizontal: 10,
    },
    energy: {
      fontWeight: '600',
      fontFamily: 'DMSansBold',
    },
    timer: {
      color: theme.text,
      position: 'absolute',
      top: '90%',
      fontWeight: '600',
      fontSize: 10,
      paddingLeft: 20,
      alignSelf: 'center',
      fontFamily: 'DMSans',
    },
  });
};
