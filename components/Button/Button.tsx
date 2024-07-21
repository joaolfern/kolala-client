import type { TouchableOpacityProps } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import Span from "../Span/Span";
import Spinner from "../Spinner/Spinner";

interface IButton extends TouchableOpacityProps {
  loading?: boolean;
}

function Button({ style, children, loading, ...rest }: IButton) {
  return (
    <TouchableOpacity {...rest} style={[styles.Button, style]}>
      {loading ? (
        <Span style={styles.spinnerWrapper}>
          <Spinner style={styles.spinner} />
        </Span>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  Button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.primaryColor,
    borderRadius: 16,
    height: 48,
    justifyContent: "center",
  },
  spinner: {
    marginRight: 10,
  },
  spinnerWrapper: {
    alignItems: "center",
    flexGrow: 1,
  },
});
