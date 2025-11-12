import { colors } from './colors';

export const light = {
  // Backgrounds
  background: colors.offWhite,
  card: colors.white,
  button: colors.bluePrimary,
  premiumButton: colors.legendaryOrange,
  energy: colors.energyOrange,

  // Texts
  text: colors.black,
  buttonText: colors.white,
  headerText: colors.bluePrimary,
  linkText: colors.blueSecondary,

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

  // Texts
  text: colors.white,
  buttonText: colors.white,
  headerText: colors.bluePrimary,
  linkText: colors.blueSecondary,

  // Surfaces
  accent: colors.lightBlack,
  shadow: colors.black,
};

export type ThemeColors = typeof light;
