import React from 'react'
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native'

interface IScroll extends ScrollViewProps {}

function Scroll({ style, ...rest }: IScroll) {
  return <ScrollView style={[style, styles.Scroll]} {...rest} />
}

export default Scroll

const styles = StyleSheet.create({
  Scroll: {
    padding: 16,
  },
})
