type DateSuffixes = 'st' | 'nd' | 'rd' | 'th';

const getDateSuffix = (dayOfMonth: number): DateSuffixes => {
  if (dayOfMonth !== 11 && (dayOfMonth === 1 || dayOfMonth % 10 === 1))
    return 'st';
  if (dayOfMonth !== 12 && (dayOfMonth === 2 || dayOfMonth % 10 === 2))
    return 'nd';
  if (dayOfMonth !== 13 && (dayOfMonth === 3 || dayOfMonth % 10 === 3))
    return 'rd';

  return 'th';
};

export default getDateSuffix;
