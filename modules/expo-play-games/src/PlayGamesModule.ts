import { NativeModule, requireNativeModule } from 'expo';

import { PlayGamesModuleEvents } from './PlayGamesModule.types';

declare class PlayGamesModule extends NativeModule<PlayGamesModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PlayGamesModule>('PlayGamesModule');
