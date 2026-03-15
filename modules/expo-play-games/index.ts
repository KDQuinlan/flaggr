// Reexport the native module. On web, it will be resolved to PlayGamesModule.web.ts
// and on native platforms to PlayGamesModule.ts
export { default } from './src/PlayGamesModule';
export { default as PlayGamesModuleView } from './src/PlayGamesModuleView';
export * from  './src/PlayGamesModule.types';
