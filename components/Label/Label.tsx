import type { TextProps } from "react-native";
import { StyleSheet } from "react-native";

import Text from "../Text/Text";

type IProps = TextProps & {};

function Label({ style, ...rest }: IProps) {
  return <Text style={[styles.Label, style]} {...rest} />;
}

const styles = StyleSheet.create({
  Label: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 11,
  },
});
export default Label;
