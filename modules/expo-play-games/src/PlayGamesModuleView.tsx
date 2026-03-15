import { requireNativeView } from 'expo';
import * as React from 'react';

import { PlayGamesModuleViewProps } from './PlayGamesModule.types';

const NativeView: React.ComponentType<PlayGamesModuleViewProps> =
  requireNativeView('PlayGamesModule');

export default function PlayGamesModuleView(props: PlayGamesModuleViewProps) {
  return <NativeView {...props} />;
}
