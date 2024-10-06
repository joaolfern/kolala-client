import type { Ref } from 'react'
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form'
import type { TextInputProps } from 'react-native'
import { StyleSheet, TextInput as DefaultTextInput } from 'react-native'

import Colors from '@/constants/Colors'

export type IProps<T extends FieldValues> = TextInputProps & {
  name: Path<T>
  control: Control<T> | undefined
  defaultValue?: PathValue<T, Path<T>>
  inputRef?: Ref<DefaultTextInput> | null
}

function TextInput<T extends FieldValues>({
  style,
  name,
  control,
  defaultValue,
  inputRef,
  ...rest
}: IProps<T>) {
  const { field } = useController({
    name,
    control,
    defaultValue,
  })

  const { value, onChange } = field
  return (
    <DefaultTextInput
      ref={inputRef}
      value={value}
      onChangeText={onChange}
      placeholderTextColor={Colors.gray}
      style={[styles.TextInput, style]}
      {...rest}
    />
  )
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
})

export default TextInput
