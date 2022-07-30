import React from 'react'
import { StyleSheet } from 'react-native'
import TextInput, { IProps } from '../TextInput/TextInput'

function Textarea({ ...rest }: IProps) {
  return (
    <TextInput
      multiline={true}
      numberOfLines={5}
      style={styles.Textarea}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  Textarea: {
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
})

export default Textarea
