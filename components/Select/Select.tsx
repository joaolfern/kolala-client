import { useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import type {
  PickerSelectProps,
  PickerStyle,
} from "react-native-picker-select";
import RNPickerSelect from "react-native-picker-select";

import ArrowRight from "../../assets/images/arrow-right.svg";
import Colors from "../../constants/Colors";

type IProps = Omit<PickerSelectProps, "onValueChange"> & {
  name: string;
  control: any;
  defaultValue?: string;
};

export default function Select({
  name,
  control,
  defaultValue,
  ...rest
}: IProps) {
  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  const { onChange, value } = field;

  return (
    <View style={styles.Container}>
      <RNPickerSelect
        value={value}
        placeholder={{ label: "Selecione uma opção", value: null }}
        style={style}
        onValueChange={onChange}
        useNativeAndroidPickerStyle={false}
        {...rest}
      />
      <ArrowRight
        style={[
          styles.Arrow,
          {
            transform: [{ translateY: -10 }],
          },
        ]}
      />
    </View>
  );
}

const style: PickerStyle = {
  inputIOS: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 10,
    minHeight: 58,
    color: Colors.text,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingRight: 30,
  },
  placeholder: {
    color: Colors.gray,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 10,
    minHeight: 58,
    color: Colors.text,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingRight: 30,
  },
};

const styles = StyleSheet.create({
  Container: {
    position: "relative",
  },
  Arrow: {
    position: "absolute",
    right: 20,
    top: "50%",
    margin: "auto",
  },
});
