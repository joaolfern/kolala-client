import { StyleSheet, View } from 'react-native'

function Span({ style, ...rest }: View['props']) {
  return <View style={[styles.Span, style]} {...rest} />
}

const styles = StyleSheet.create({
  Span: {},
})

export default Span
