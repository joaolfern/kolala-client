import { StyleSheet, View as DefaultView } from 'react-native'
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'

export default function SafeAreaView({
  style,
  ...otherProps
}: DefaultView['props']) {
  return <DefaultSafeAreaView style={[styles.View, style]} {...otherProps} />
}

const styles = StyleSheet.create({
  View: {
    padding: 16,
    backgroundColor: Colors.background,
    height: '100%',
    width: '100%',
  },
})
