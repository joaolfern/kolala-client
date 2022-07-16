import { StyleSheet,  View as DefaultView } from 'react-native'
import Colors from '../../constants/Colors'

export function View({
  style,
  ...otherProps
}: DefaultView['props']) {

  return <View style={[styles.View, style]} {...otherProps} />
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: Colors.background
  },
})
