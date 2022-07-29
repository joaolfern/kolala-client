declare module '*.png' {
  const value: any
  export = value
}

declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}