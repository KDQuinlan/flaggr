import { NativeModules } from 'react-native';

interface IPlayGamesModule {
  signIn(): Promise<boolean>;
  submitScore(leaderboardId: string, score: number): Promise<boolean>;
  showAllLeaderboards(): Promise<boolean>;

/**
   * Saves game data to the cloud.
   * @param filename - The unique name of the save file (e.g., "snapshot-1").
   * @param data - The stringified JSON data you want to save.
   * @param description - A short text description visible in the Drive UI (e.g. "Level 5").
   */
  saveGame(filename: string, data: string, description: string): Promise<boolean>;

  /**
   * Loads game data from the cloud.
   * @param filename - The unique name of the save file to load.
   * @returns A promise resolving to the stringified JSON data.
   */
  loadGame(filename: string): Promise<string>;
}

const { PlayGamesModule } = NativeModules;

export default PlayGamesModule as IPlayGamesModule;
