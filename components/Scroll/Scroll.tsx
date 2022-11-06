import React, { ForwardedRef, forwardRef, Ref } from 'react'
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native'

interface IScroll extends ScrollViewProps {}

function Scroll({ style, ...rest }: IScroll, ref: Ref<ScrollView> | null) {
  return <ScrollView ref={ref} style={[style, styles.Scroll]} {...rest} />
}

export default forwardRef(Scroll)

const styles = StyleSheet.create({
  Scroll: {
    padding: 16,
  },
})
