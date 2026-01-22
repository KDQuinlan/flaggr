import { INoticeBoardEntryProps } from '@/types/noticeBoard';
import * as post1768142297776 from './1768142297776-noticeBoard';
import * as post1768237696056 from './1768237696056-whatsNext';
import * as post1768982622828 from './1768982622828-fotw';

/*

--- Posts that appear in the Notice Board screen ---

The order they appear on the screen is a map of the order of the array,
meaning the final one in the array is at the bottom.

Posts should be in date order and removed over time

*/

export const noticeBoardEntryData: INoticeBoardEntryProps[] = [
  post1768982622828.default,
  post1768237696056.default,
  post1768142297776.default,
];
