declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  import { ComponentType } from 'react';
  const content: ComponentType<SvgProps>;
  export default content;
}
