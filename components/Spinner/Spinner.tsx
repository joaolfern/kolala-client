import { Image, StyleSheet } from "react-native";
import type { ImageProps } from "react-native-svg";

// @ts-ignore
import spinner from "../../assets/images/spinner-white.gif";

interface IProps extends ImageProps {
  style?: any;
}

function Spinner({ style, ...rest }: IProps) {
  return <Image style={[styles.Image, style]} source={spinner} {...rest} />;
}

export default Spinner;

const styles = StyleSheet.create({
  Image: {
    width: 30,
    height: 30,
  },
});
