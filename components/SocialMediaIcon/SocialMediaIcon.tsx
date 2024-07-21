import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

interface IProps {
  icon: any;
}

function SocialMediaIcon({ icon }: IProps) {
  return (
    <MaterialCommunityIcons
      style={styles.SocialMediaIcon}
      name={icon}
      size={55}
      color={Colors.text}
    />
  );
}

export default SocialMediaIcon;

const styles = StyleSheet.create({
  SocialMediaIcon: {
    marginRight: 16,
    width: 55,
  },
});
