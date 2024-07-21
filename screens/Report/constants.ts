import Colors from "../../constants/Colors";
import type { ISelect } from "../../types";

export const REPORT_CATEGORY_RESOURCE: ISelect<number>[] = [
  {
    value: 0,
    label: "Spam",
  },
  {
    value: 1,
    label: "Conteúdo ofensivo",
  },
  {
    value: 2,
    label: "Golpe",
  },
  {
    value: 3,
    label: "Conteúdo ilegal",
  },
  {
    value: 4,
    label: "Outro motivo",
  },
];

export const REPORT_STATUS_COLOR_RESOURCE = {
  0: Colors.yellow,
  1: Colors.green,
  2: Colors.red,
};

export const REPORT_STATUS_RESOURCE: ISelect<number>[] = [
  {
    value: 0,
    label: "Pendente",
  },
  {
    value: 1,
    label: "Aprovado",
  },
  {
    value: 2,
    label: "Descartado",
  },
];
