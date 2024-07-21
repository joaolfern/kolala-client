import type { View as DefaultView } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView as DefaultSafeAreaView } from "react-native-safe-area-context";

import Colors from "../../constants/Colors";

export default function SafeAreaView({
  style,
  ...otherProps
}: DefaultView["props"]) {
  return <DefaultSafeAreaView style={[styles.View, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});
