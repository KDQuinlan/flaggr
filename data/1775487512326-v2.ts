import {
  INoticeBoardEntryProps,
  NoticeBoardContentSection,
} from '@/types/noticeBoard';

const content: NoticeBoardContentSection[] = [
  {
    header: 'Flaggr Profile',
    text: 'With Flaggr 2.0 comes our biggest new system yet: the Profile screen.\n\nThe Profile is your new hub for account information, achievements and statistics!',
  },
  {
    header: 'Achievements',
    text: 'There are 12 achievements in Flaggr, each with 3-4 steps. Each becomes visible in your profile after unlock the first step, and clicking on one shows your full progression for that achievement.',
  },
  {
    header: 'Experience',
    text: 'Your Profile has a level and experience bar. Use the bonus experience from achievements to compete with your friends on the new User Level leaderboard!',
  },
  {
    header: 'New Settings',
    text: "If you wanted to hear an auditory response, feel haptic feedback, or both in Flaggr, you now can! This setting is called 'Feedback', and it is turned off by default.\n\nWith Flaggr 2 also comes 'Immersive Mode' which hides your navigation bar, giving you more space. This can be turned on or off in the settings too in case you enjoy, or rely on, it.",
  },
  {
    header: 'Improvements',
    text: 'This update brings a whole swathe of quality-of-life, bug fixes and accessibility improvements. If anything seems wrong, or you have ideas, use the Feedback screen to send it to us!',
  },
];

const update: INoticeBoardEntryProps = {
  title: 'Flaggr 2.0.0',
  date: 1775487512326,
  updateType: 'Major Update',
  image: require('@/assets/images/notices/1775487512326-v2.png'),
  content,
} as const;

export default update;
