import { NativeModules } from 'react-native';

interface IPlayGamesModule {
  signIn(): Promise<boolean>;
  submitScore(leaderboardId: string, score: number): Promise<boolean>;
  showAllLeaderboards(): Promise<boolean>;
}

const { PlayGamesModule } = NativeModules;

export default PlayGamesModule as IPlayGamesModule;
