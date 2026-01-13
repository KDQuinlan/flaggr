export type NoticeBoardUpdateTypes =
  | 'Major Update'
  | 'New Feature'
  | 'Improvement'
  | 'Upcoming'
  | 'News';

export type NoticeBoardContentSection = {
  header: string;
  text: string;
};

export interface INoticeBoardEntryProps {
  title: string;
  date: number;
  updateType: NoticeBoardUpdateTypes;
  image: string | undefined;
  content: NoticeBoardContentSection[];
}
