import flagOfTheWeekDataSet from '@/constants/flagOfTheWeek';

const getFlagOfTheWeek = (dateOfLatestMonday: Date) => {
  const getRotationYear = (year: number) => {
    if (year % 3 === 0) return 2;
    if (year % 2 === 0) return 1;

    return 0;
  };

  const DAYS_IN_WEEK = 7;
  const yearInRotation = getRotationYear(dateOfLatestMonday.getFullYear());
  const month = dateOfLatestMonday.getMonth();
  const week = Math.floor(dateOfLatestMonday.getDate() / DAYS_IN_WEEK);

  return flagOfTheWeekDataSet[month]![yearInRotation]![week]!;
};

export default getFlagOfTheWeek;
