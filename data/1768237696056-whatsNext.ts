import {
  INoticeBoardEntryProps,
  NoticeBoardContentSection,
} from '@/types/noticeBoard';

const content: NoticeBoardContentSection[] = [
  {
    header: 'Flaggr 2026',
    text: "With 2026 well underway, it's time to share our plans for Flaggr and what features will be coming your way!\n\nAs always, if you have any feedback or suggestions, please use our feedback page to tell us.",
  },
  {
    header: 'Coming Soon',
    text: '- Further accessibility improvements\n- Flag of the week\n- New flags (partially recognised flags)\n- Additional language support\n- New gamemode',
  },
  {
    header: 'Throught the Year',
    text: '- Profile, achievements\n- Passport improvements\n- New gamemodes\n- Themed events',
  },
];

const update: INoticeBoardEntryProps = {
  title: "What's Next",
  date: 1768237696056,
  updateType: 'Upcoming',
  image: require('@/assets/images/notices/1768237696056-whatsNext.png'),
  content,
} as const;

export default update;
