import React, { ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Colors from '../../constants/Colors'

function Button ({ style, ...rest  }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.Button, style]}
    />
  )
}

export default Button

const styles = StyleSheet.create({
  Button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.primaryColor,
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
  },
})