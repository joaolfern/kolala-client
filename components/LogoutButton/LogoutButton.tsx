import React from 'react'
import Button from '../Button/Button'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacityProps } from 'react-native'

function LogoutButton({ style, ...rest }: TouchableOpacityProps) {
  return (
    <Button style={[style, styles.button]} {...rest}>
      <MaterialIcons name='logout' size={24} color='black' />
    </Button>
  )
}

export default LogoutButton

const styles = StyleSheet.create({
  button: {
    borderRadius: 9999,
    width: 53,
    height: 53,
  },
})
