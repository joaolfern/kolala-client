import type { Omit } from "@reduxjs/toolkit/dist/tsHelpers";
import type { ImageProps, ImageSourcePropType } from "react-native";
import { Image, StyleSheet } from "react-native";

import blankProfile from "../../assets/images/blank-profile.png";
import Span from "../Span/Span";

export type IAvatar = Omit<ImageProps, "source"> & {
  source: ImageSourcePropType | undefined;
};

function Avatar({ style, source, ...rest }: IAvatar) {
  return (
    <Span style={styles.pictureWrapper}>
      <Image
        style={[styles.picture, style]}
        source={source || blankProfile}
        {...rest}
      />
    </Span>
  );
}

const styles = StyleSheet.create({
  picture: {
    aspectRatio: 1,
    resizeMode: "cover",
    width: 51,
    height: 51,
    borderRadius: 9999999,
  },
  pictureWrapper: {
    borderRadius: 9999999,
    overflow: "hidden",
  },
});

export default Avatar;
