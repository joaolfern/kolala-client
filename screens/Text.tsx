import { StyleSheet,  Text as DefaultText } from 'react-native'
import Colors from '../constants/Colors'

export function Text({
  style,
  ...otherProps
}: DefaultText['props']) {

  return <Text style={[styles.Text, style]} {...otherProps} />
}

const styles = StyleSheet.create({
  Text: {
    backgroundColor: Colors.text
  },
})
