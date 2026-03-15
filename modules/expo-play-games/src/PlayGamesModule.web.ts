import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './PlayGamesModule.types';

type PlayGamesModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class PlayGamesModule extends NativeModule<PlayGamesModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(PlayGamesModule, 'PlayGamesModule');
