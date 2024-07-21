import type { ReactNode } from "react";
import { StyleSheet } from "react-native";

import type { IAvatar } from "../Avatar/Avatar";
import Avatar from "../Avatar/Avatar";
import Span from "../Span/Span";

type IProps = IAvatar & {
  children: ReactNode;
};

function AvatarWithIcon({ children, ...rest }: IProps) {
  return (
    <Span style={styles.Wrapper}>
      <Avatar {...rest} />
      <Span style={styles.Icon}>{children}</Span>
    </Span>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    position: "relative",
  },
  Icon: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

export default AvatarWithIcon;
