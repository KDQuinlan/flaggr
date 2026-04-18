import { INoticeBoardEntryProps } from '@/types/noticeBoard';
import * as post1768982622828 from './1768982622828-fotw';
import * as post1775487512326 from './1775487512326-v2';
import * as post1776358800655 from './1776358800655-prodRelease';

/*

--- Posts that appear in the Notice Board screen ---

The order they appear on the screen is a map of the order of the array,
meaning the final one in the array is at the bottom.

Posts should be in date order and removed over time

*/

export const noticeBoardEntryData: INoticeBoardEntryProps[] = [
  post1776358800655.default,
  post1775487512326.default,
  post1768982622828.default,
];
