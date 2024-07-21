import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import AvatarOnlineStatus from "../AvatarOnlineStatus/AvatarOnlineStatus";
import { usePreventGuest } from "@/hooks/usePreventGuest";

function ProfileTabButton() {
  const navigation = useNavigation();
  const { preventGuest } = usePreventGuest();
  const { user } = useAppSelector(selectUser);

  const onPress = () => {
    preventGuest();

    navigation.navigate("Profile", {
      profileUserId: user?.id as number,
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      style={styles.Button}
    >
      <AvatarOnlineStatus
        isOnline
        source={
          user?.profile?.picture ? { uri: user.profile.picture } : undefined
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Button: {
    marginLeft: 16,
  },
});

export default ProfileTabButton;
