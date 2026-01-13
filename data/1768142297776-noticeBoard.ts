import {
  INoticeBoardEntryProps,
  NoticeBoardContentSection,
} from '@/types/noticeBoard';

const content: NoticeBoardContentSection[] = [
  {
    header: 'Notice Board Introduction',
    text: "The Notice Board is our latest communication tool to help us update you on everything Flaggr from major updates, to improvements, news and what's upcoming. \n\nIf you have any feedback on it, or what it could be used for, then please use the home screen feedback section. We will read it.",
  },
  {
    header: 'Summary Screen Redesign',
    text: 'For a long time, while we focused on more important functionality, the summary screen was very bland so we could at least get the information to you about your game. \n\nIn this update, we have given the summary screen a much needed redesign, including a tracking section we call "History" to provide an alternative way of looking at your game summary.',
  },
  {
    header: 'Accessibility Improvements',
    text: 'In this update, a number of accessibility improvements have been made, including cases where accessibility is missing. This is still on ongoing as we look to provide the best possible experience to our accessibility users',
  },
];

const update: INoticeBoardEntryProps = {
  title: 'The Notice Board',
  date: 1768142297776,
  updateType: 'New Feature',
  image: require('@/assets/images/notices/1768142297776-noticeBoard.png'),
  content,
} as const;

export default update;
