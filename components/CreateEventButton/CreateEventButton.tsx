import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import Button from "../Button/Button";
import Text from "../Text/Text";

function CreateEventButton() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("EventForm");
  };
  return (
    <Button onPress={onPress} style={styles.CreateButton}>
      <Text style={styles.CreateButtonText}>Criar evento</Text>
    </Button>
  );
}

export default CreateEventButton;

const styles = StyleSheet.create({
  CreateButton: {
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  CreateButtonText: {
    color: Colors.altText,
    fontWeight: "600",
  },
});
