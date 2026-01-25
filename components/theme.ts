import { colors } from './colors';

export const light = {
  // Backgrounds
  background: colors.offWhite,
  backgroundHighContrast: colors.coolGrey,
  card: colors.white,
  button: colors.bluePrimary,
  premiumButton: colors.legendaryOrange,
  energy: colors.energyOrange,
  correct: colors.correctGreen,
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
  border: colors.lightGrey,
};

export const dark = {
  // Backgrounds
  background: colors.black,
  backgroundHighContrast: colors.darkGreyBlue,
  card: colors.offBlack,
  button: colors.bluePrimary,
  premiumButton: colors.legendaryOrange,
  energy: colors.energyOrange,
  correct: colors.correctGreen,
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
  border: colors.offBlack,
};

export type ThemeColors = typeof light;
