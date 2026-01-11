export type NoticeBoardUpdateTypes =
  | 'Major Update'
  | 'New Feature'
  | 'Improvement'
  | 'Upcoming'
  | 'News';

export interface INoticeBoardEntryProps {
  title: string;
  date: number;
  updateType: NoticeBoardUpdateTypes;
  image: string | undefined;
}

export const noticeBoardEntryData: INoticeBoardEntryProps[] = [
  {
    title: 'The Notice Board',
    date: 1768142297776,
    updateType: 'New Feature',
    image: require('@/assets/images/notices/test.png'),
  },
];
