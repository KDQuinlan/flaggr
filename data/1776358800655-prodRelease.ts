import {
  INoticeBoardEntryProps,
  NoticeBoardContentSection,
} from '@/types/noticeBoard';

const content: NoticeBoardContentSection[] = [
  {
    header: 'Flaggr Releases!',
    text: "After 20+ closed and open test releases, Flaggr is finally here! Thank you to everyone who tested the app along the way.\n\nWe are always looking for feedback and suggestions, so don't hesitate to use our feedback tool to tell us what you'd like to see in the app.",
  },
  {
    header: "What's Next?",
    text: "Flaggr has released, but that doesn't mean we're done! Here is what we have in store for the future of Flaggr:\n\n- New gamemodes, our immediate priority\n- New categories of flags e.g. deprecated/historical flags\n- Co-op / multiplayer\n- iOS release\n\nDespite being a small team of only 2, we aim to carry on fixing bugs and improving UI and accessibility. Make sure to keep Flaggr updated to see our new changes!\n\nThank you, and happy playing!",
  },
];

const update: INoticeBoardEntryProps = {
  title: 'Flaggr Release!',
  date: 1776358800655,
  updateType: 'News',
  image: require('@/assets/images/notices/1776358800655-prodRelease.png'),
  content,
} as const;

export default update;
