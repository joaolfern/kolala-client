import type { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Scroll from "../Scroll/Scroll";
import Span from "../Span/Span";
import TimesCircle from "../TimesCircle/TimesCircle";

interface IProps {
  children: ReactNode;
  onClose(): void;
}

function ModalWrapper({ children, onClose }: IProps) {
  return (
    <Scroll style={styles.Container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <TimesCircle />
      </TouchableOpacity>
      <Span style={styles.Content}>{children}</Span>
    </Scroll>
  );
}

export default ModalWrapper;

const styles = StyleSheet.create({
  Container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 3,
    backgroundColor: "transparent",
    padding: 0,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 12,
    marginTop: 18,
    marginBottom: 16,
  },
  Content: {
    marginBottom: 32,
    flex: 1,
  },
});
