import { GameRouting, Levels } from '@/state/secureStoreStructure';

type RouterParamList = {
  difficulty: {
    name: GameRouting;
  };
  multipleChoice: {
    name: Levels;
  };
};

export default RouterParamList;
