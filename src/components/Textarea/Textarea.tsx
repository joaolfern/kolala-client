import { StyleSheet } from 'react-native'

import type { IProps } from '../TextInput/TextInput'
import TextInput from '../TextInput/TextInput'

function Textarea({ ...rest }: IProps) {
  return (
    <TextInput multiline numberOfLines={5} style={styles.Textarea} {...rest} />
  )
}

const styles = StyleSheet.create({
  Textarea: {
    textAlignVertical: 'top',
    paddingVertical: 10,
    marginBottom: 0,
  },
})

export default Textarea
