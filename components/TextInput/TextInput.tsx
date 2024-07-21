import type { Ref } from "react";
import { forwardRef } from "react";
import { useController } from "react-hook-form";
import type { TextInputProps } from "react-native";
import { StyleSheet, TextInput as DefaultTextInput } from "react-native";

import Colors from "../../constants/Colors";

export type IProps = TextInputProps & {
  name: string;
  control: any;
  defaultValue?: string;
};

function TextInput(
  { style, name, control, defaultValue = "", ...rest }: IProps,
  ref: Ref<DefaultTextInput> | null,
) {
  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  const { value, onChange } = field;
  return (
    <DefaultTextInput
      ref={ref}
      value={value}
      onChangeText={onChange}
      placeholderTextColor={Colors.gray}
      style={[styles.TextInput, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 10,
    minHeight: 58,
    color: Colors.text,
    marginBottom: 4,
    fontSize: 18,
    paddingHorizontal: 20,
  },
});

export default forwardRef(TextInput);
