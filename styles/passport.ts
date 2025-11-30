import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/components/theme';
import { colors } from '@/components/colors';

export const getPassportStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 20,
    },
    emptyPassportContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 20,
      marginHorizontal: 20,
      marginTop: 20,
      gap: 20,
    },
    text: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 14,
    },
    titleText: {
      color: theme.text,
      fontFamily: 'DMSansBold',
      fontSize: 20,
    },
    searchInput: {
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.accent,
      marginBottom: 10,
      flex: 1,
    },
    passportCard: {
      backgroundColor: theme.card,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.accent,
      borderRadius: 8,
    },
    passportCardImage: {
      width: '100%',
      alignSelf: 'center',
      aspectRatio: 16 / 9,
      marginBottom: 10,
    },
    passportCardText: {
      color: theme.text,
      fontFamily: 'DMSans',
      fontSize: 14,
      alignSelf: 'center',
    },
    flatlistContainer: {
      gap: 10,
      paddingBottom: 20,
    },
    totalText: {
      color: theme.text,
      fontFamily: 'DMSansBold',
      fontSize: 16,
      marginVertical: 5,
    },
    totalInformationButton: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      width: 150,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    modalContainer: {
      backgroundColor: theme.background,
      paddingVertical: 20,
      paddingHorizontal: 24,
      borderRadius: 8,
      width: '100%',
      maxWidth: 340,
      borderWidth: 1,
      borderColor: theme.accent,
      alignItems: 'center',
      gap: 20,
    },
    closeButton: {
      backgroundColor: theme.button,
      padding: 10,
      borderRadius: 8,
      width: '60%',
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontWeight: '500',
      fontSize: 16,
    },
    searchFilterContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    filterModalTitleRoot: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: theme.accent,
      height: 40,
    },
    filterModalTitleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.bluePrimary,
    },
    filterModalContentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 15,
    },
    noResultsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      marginTop: 10,
    },
  });
};
