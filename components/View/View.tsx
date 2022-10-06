import { StyleSheet, View as DefaultView } from 'react-native'
import Colors from '../../constants/Colors'

export default function View({ style, ...otherProps }: DefaultView['props']) {
  return <DefaultView style={[styles.View, style]} {...otherProps} />
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: Colors.background,
    height: '100%',
    width: '100%',
  },
})
