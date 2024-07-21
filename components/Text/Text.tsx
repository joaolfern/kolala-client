import { StyleSheet, Text as DefaultText } from "react-native";

import Colors from "../../constants/Colors";

export default function Text({ style, ...otherProps }: DefaultText["props"]) {
  return <DefaultText style={[styles.Text, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 18,
    color: Colors.text,
  },
});
