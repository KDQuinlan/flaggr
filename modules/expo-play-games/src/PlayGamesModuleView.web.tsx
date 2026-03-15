import * as React from 'react';

import { PlayGamesModuleViewProps } from './PlayGamesModule.types';

export default function PlayGamesModuleView(props: PlayGamesModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
