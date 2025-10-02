declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  import { ComponentType } from 'react';
  const content: ComponentType<SvgProps>;
  export default content;
}

declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';
  const content: ImageSourcePropType;
  export default content;
}
