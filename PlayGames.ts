// PlayGames.ts

import { NativeModules } from 'react-native';

// 1. Define the TypeScript "blueprint" for your native module.
// This must exactly match the function names you created in Kotlin.
interface IPlayGamesModule {
  signIn(): Promise<boolean>;
  submitScore(leaderboardId: string, score: number): Promise<boolean>;
  showLeaderboard(leaderboardId: string): Promise<boolean>;
}

// 2. Access the native module from React Native's central list.
// The name 'PlayGamesModule' must exactly match the name from your Kotlin file.
const { PlayGamesModule } = NativeModules;

// 3. Export a clean, typed version for the rest of your app to use.
export default PlayGamesModule as IPlayGamesModule;