import LevelOne from './resources/levels/level-one.png';
import LevelTwo from './resources/levels/level-two.png';
import LevelThree from './resources/levels/level-three.png';
import LevelFour from './resources/levels/level-four.png';
import LevelFive from './resources/levels/level-five.png';
import LevelSix from './resources/levels/level-six.png';
import LevelSeven from './resources/levels/level-seven.png';
import LevelEight from './resources/levels/level-eight.png';
import LevelNine from './resources/levels/level-nine.png';
import LevelTen from './resources/levels/level-ten.png';

import Standard from './resources/gameModes/standard.png';
import Rapid from './resources/gameModes/rapid.png';
import Custom from './resources/gameModes/custom.png';
import Passport from './resources/gameModes/passport.png';

type IconMap = Record<string, any>;

const iconsMap: IconMap = {
  levelOne: LevelOne,
  levelTwo: LevelTwo,
  levelThree: LevelThree,
  levelFour: LevelFour,
  levelFive: LevelFive,
  levelSix: LevelSix,
  levelSeven: LevelSeven,
  levelEight: LevelEight,
  levelNine: LevelNine,
  levelTen: LevelTen,

  standard: Standard,
  rapid: Rapid,
  custom: Custom,
  passport: Passport,
};

export default iconsMap;
