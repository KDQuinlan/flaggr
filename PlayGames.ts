import { requireNativeModule } from 'expo-modules-core';

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

const PlayGames = requireNativeModule<IPlayGamesModule>('ExpoPlayGames');

export default PlayGames;
