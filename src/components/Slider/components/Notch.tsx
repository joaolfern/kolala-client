import { memo } from 'react'
import type { ViewProps } from 'react-native'
import { StyleSheet, View } from 'react-native'

import Colors from '@/constants/Colors'

type IProps = ViewProps

const Notch = ({ ...rest }: IProps) => {
  return <View style={styles.root} {...rest} />
}

export default memo(Notch)

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.secondaryColor,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
    transform: [{ translateY: 20 }],
  },
})
