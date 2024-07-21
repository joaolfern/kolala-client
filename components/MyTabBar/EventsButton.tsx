import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import useMarkers from "../../screens/Home/hooks/useMarkers";
import Button from "../Button/Button";
import Span from "../Span/Span";
import Text from "../Text/Text";
import HangsButton from "./HangsButton";
import { usePreventGuest } from "@/hooks/usePreventGuest";

function EventsButton() {
  const navigation = useNavigation();
  const { markers } = useMarkers();
  const { preventGuest } = usePreventGuest();

  const openMyEvents = () => {
    preventGuest();
    navigation.navigate("EventsOverview");
  };

  return (
    <Span style={styles.Wrapper}>
      <HangsButton />
      <Button
        accessibilityRole="button"
        onPress={openMyEvents}
        style={styles.Button}
      >
        <Text style={styles.Text}>{markers.length} eventos</Text>
      </Button>
    </Span>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    alignItems: "flex-end",
  },
  Button: {
    position: "relative",
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    height: 43,
    maxWidth: 135,
    backgroundColor: Colors.secondaryColor,
  },
  Text: {
    color: Colors.altText,
    fontSize: 16,
    textAlign: "right",
  },
});

export default EventsButton;
