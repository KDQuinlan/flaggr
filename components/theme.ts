import { colors } from './colors';

export const light = {
  // Backgrounds
  background: colors.offWhite,
  card: colors.white,
  button: colors.bluePrimary,
  premiumButton: colors.legendaryOrange,
  energy: colors.energyOrange,
  correct: colors.correctRed,
  incorrect: colors.incorrectRed,

  // Texts
  text: colors.black,
  buttonText: colors.white,
  headerText: colors.bluePrimary,
  linkText: colors.blueSecondary,
  helperText: colors.darkBrown,
  descriptionText: colors.lightBlack,
  warningText: colors.warningOrange,

  // Surfaces
  accent: colors.lightGrey,
  shadow: colors.black,
};

export const dark = {
  // Backgrounds
  background: colors.black,
  card: colors.offBlack,
  button: colors.bluePrimary,
  premiumButton: colors.legendaryOrange,
  energy: colors.energyOrange,
  correct: colors.correctRed,
  incorrect: colors.incorrectRed,

  // Texts
  text: colors.white,
  buttonText: colors.white,
  headerText: colors.bluePrimary,
  linkText: colors.blueSecondary,
  helperText: colors.lightBrown,
  descriptionText: colors.lightGrey,
  warningText: colors.warningOrange,

  // Surfaces
  accent: colors.lightBlack,
  shadow: colors.white,
};

export type ThemeColors = typeof light;
