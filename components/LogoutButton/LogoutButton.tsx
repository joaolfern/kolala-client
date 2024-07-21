import { MaterialIcons } from "@expo/vector-icons";
import type { TouchableOpacityProps } from "react-native";
import { StyleSheet } from "react-native";

import Button from "../Button/Button";

function LogoutButton({ style, ...rest }: TouchableOpacityProps) {
  return (
    <Button style={[style, styles.button]} {...rest}>
      <MaterialIcons name="logout" size={24} color="black" />
    </Button>
  );
}

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 9999,
    width: 53,
    height: 53,
  },
});
