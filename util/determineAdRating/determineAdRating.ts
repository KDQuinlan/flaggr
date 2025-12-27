import { MaxAdContentRating } from 'react-native-google-mobile-ads';

const determineAdRating = (
  userAgeForPersonalisation: number
): MaxAdContentRating => {
  if (userAgeForPersonalisation >= 16) return MaxAdContentRating.T;
  if (userAgeForPersonalisation >= 13) return MaxAdContentRating.PG;

  return MaxAdContentRating.G;
};

export default determineAdRating;
