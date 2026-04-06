import { INoticeBoardEntryProps } from '@/types/noticeBoard';
import * as post1768142297776 from './1768142297776-noticeBoard';
import * as post1768237696056 from './1768237696056-whatsNext';
import * as post1768982622828 from './1768982622828-fotw';
import * as post1775487512326 from './1775487512326-v2';

/*

--- Posts that appear in the Notice Board screen ---

The order they appear on the screen is a map of the order of the array,
meaning the final one in the array is at the bottom.

Posts should be in date order and removed over time

*/

export const noticeBoardEntryData: INoticeBoardEntryProps[] = [
  post1775487512326.default,
  post1768982622828.default,
  post1768237696056.default,
  post1768142297776.default,
];
