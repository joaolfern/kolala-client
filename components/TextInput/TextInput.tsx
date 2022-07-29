import React from 'react'
import {
  StyleSheet,
  TextInput as DefaultTextInput,
  TextInputProps,
} from 'react-native'
import Colors from '../../constants/Colors'
import { useController } from 'react-hook-form'

type IProps = TextInputProps & {
  name: string
  control: any
  defaultValue?: string
}

function TextInput({
  style,
  name,
  control,
  defaultValue = '',
  ...rest
}: IProps) {
  const { field } = useController({
    name,
    control,
    defaultValue,
  })

  const { value, onChange } = field
  return (
    <DefaultTextInput
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
    height: 58,
    color: Colors.text,
    marginBottom: 25,
    fontSize: 18,
    paddingHorizontal: 20,
  },
})

export default TextInput
