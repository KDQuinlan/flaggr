import {
  INoticeBoardEntryProps,
  NoticeBoardContentSection,
} from '@/types/noticeBoard';

const content: NoticeBoardContentSection[] = [
  {
    header: 'Flag of the Week Is Here',
    text: 'Flag of the Week has landed on the home screen. Each week a new flag will appear on the home screen. Currently, this takes you to the Passport Entry for that flag, even if you have not unlocked it in the Passport.\n\nWe plan to do more with this such as unique information or a small quiz, but for now the foundations have been laid. Let us know what you think!',
  },
  {
    header: 'Home Screen Shuffle',
    text: 'To accommodate for Flag of the Week, and improve the user experience on smaller phones, the floating buttons for Feedback and Leaderboard have been moved.\n\nIn addition, number of accessibility improvements have been made to provide much better context.',
  },
];

const update: INoticeBoardEntryProps = {
  title: 'Flag of the Week',
  date: 1768982622828,
  updateType: 'New Feature',
  image: require('@/assets/images/notices/1768982622828-fotw.png'),
  content,
} as const;

export default update;
