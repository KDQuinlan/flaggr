import LevelOne from './resources/levels/level-one.png';
import LevelTwo from './resources/levels/level-two.png';
import LevelThree from './resources/levels/level-three.png';
import LevelFour from './resources/levels/level-four.png';
import LevelFive from './resources/levels/level-five.png';

import Standard from './resources/gameModes/standard.png';
import Rapid from './resources/gameModes/rapid.png';
import Custom from './resources/gameModes/custom.png';

type IconMap = Record<string, any>;

const iconsMap: IconMap = {
  levelOne: LevelOne,
  levelTwo: LevelTwo,
  levelThree: LevelThree,
  levelFour: LevelFour,
  levelFive: LevelFive,

  standard: Standard,
  rapid: Rapid,
  custom: Custom,
};

export default iconsMap;
