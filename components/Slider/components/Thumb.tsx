import { memo } from "react";
import { StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";
import { shadow } from "@/screens/EventForm/utils";
import Span from "../../Span/Span";

const THUMB_RADIUS = 12;

const Thumb = () => {
  return (
    <Span style={styles.TouchareaWrapper}>
      <View style={styles.root} />
    </Span>
  );
};

const styles = StyleSheet.create({
  TouchareaWrapper: {
    height: 80,
    justifyContent: "center",
  },
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.secondaryColor,
    backgroundColor: Colors.secondaryColor,
    ...shadow,
  },
});

export default memo(Thumb);
