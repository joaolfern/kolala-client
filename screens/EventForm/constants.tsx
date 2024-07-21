import type { ImageURISource } from "react-native";
import type { Item } from "react-native-picker-select";

// @ts-ignore
import announcement from "../../assets/mapIcons/announcement.png";
import coffee from "../../assets/mapIcons/coffee.png";
import music from "../../assets/mapIcons/music.png";
import workout from "../../assets/mapIcons/workout.png";
import { asResource } from "./utils";

export const CATEGORY_RESOURCE: Item[] = [
  {
    label: "Cultura",
    value: 4,
  },
  {
    label: "Comida",
    value: 2,
  },
  {
    label: "Música",
    value: 1,
  },
  {
    label: "Esporte",
    value: 3,
  },
  {
    label: "Tecnologia",
    value: 0,
  },
  {
    label: "Educação",
    value: 5,
  },
];

export const MAP_ICONS: { [key: number]: ImageURISource } = {
  0: coffee,
  1: music,
  2: workout,
  3: announcement,
  // 4: charizard,
};

export const MAP_ICONS_RESOURCE = asResource(MAP_ICONS);
