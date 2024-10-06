import type { Ref } from 'react'
import { forwardRef } from 'react'
import type { ScrollViewProps } from 'react-native'
import { ScrollView, StyleSheet } from 'react-native'

function Scroll(
  { style, ...rest }: ScrollViewProps,
  ref: Ref<ScrollView> | null
) {
  return <ScrollView ref={ref} style={[style, styles.Scroll]} {...rest} />
}

export default forwardRef(Scroll)

const styles = StyleSheet.create({
  Scroll: {
    padding: 16,
  },
})
