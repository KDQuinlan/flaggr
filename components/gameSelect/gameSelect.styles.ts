import { StyleSheet } from 'react-native';
import { colors } from '../colors';

// TODO - refactor for smaller screen sizes

export const gameSelectStyles = StyleSheet.create({
  gameModeContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: colors.black,
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
  gameDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  score: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: colors.offBlack,
    fontWeight: 'bold',
    fontSize: 24,
  },
});
