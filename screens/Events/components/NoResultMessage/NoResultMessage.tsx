import { StyleSheet } from "react-native";

import Text from "@/components/Text/Text";
import Colors from "@/constants/Colors";

export function NoResultMessage() {
  return <Text style={styles.NoResultMessage}>Nenhum dado</Text>;
}

export default NoResultMessage;

const styles = StyleSheet.create({
  NoResultMessage: {
    color: Colors.gray,
    margin: "auto",
    alignSelf: "center",
    marginVertical: 20,
  },
});
