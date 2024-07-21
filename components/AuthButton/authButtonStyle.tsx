import { StyleSheet } from "react-native";

const authButtonStyle = StyleSheet.create({
  Image: {
    marginRight: 28,
    width: 35,
    height: 35,
  },
  View: {
    padding: 19,
    width: "100%",
  },
  Button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 59,
    paddingLeft: 26,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  Text: {
    fontWeight: "600",
  },
});

export default authButtonStyle;
