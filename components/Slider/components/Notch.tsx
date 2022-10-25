import React, { memo } from 'react'
import { View, StyleSheet, ViewProps } from 'react-native'
import Colors from '../../../constants/Colors'

interface IProps extends ViewProps {}

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
  },
})
