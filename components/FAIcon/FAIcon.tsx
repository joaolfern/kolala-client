import { FontAwesome5 } from "@expo/vector-icons";
import type React from "react";

interface IProps {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
}

function FAIcon({ name }: IProps) {
  return <FontAwesome5 name={name} />;
}

export default FAIcon;
