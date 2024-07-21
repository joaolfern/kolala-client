import { memo } from "react";
import { StyleSheet, View } from "react-native";

import Span from "../../Span/Span";

const Rail = () => {
  return (
    <Span style={styles.TouchareaWrapper}>
      <View style={styles.root} />
    </Span>
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#f1f1f1",
  },
  TouchareaWrapper: {
    flex: 1,
    height: 80,
    justifyContent: "center",
  },
});
