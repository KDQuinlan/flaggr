import { NativeModules } from 'react-native';

export interface GooglePlayPlayer {
  displayName: string;
  playerId: string;
}

interface IPlayGamesModule {
  signIn(): Promise<boolean>;
  submitScore(leaderboardId: string, score: number): Promise<boolean>;
  showAllLeaderboards(): Promise<boolean>;
  saveGame(filename: string, data: string): Promise<boolean>;
  loadGame(filename: string): Promise<string | null>;
  getCurrentPlayer(): Promise<GooglePlayPlayer>;
}

const { PlayGamesModule } = NativeModules;

export default PlayGamesModule as IPlayGamesModule;
