import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

interface IProps {
  size?: number
}

function TimesCircle({ size = 32 }: IProps) {
  return (
    <FontAwesome5
      size={size}
      name='times-circle'
      solid={true}
      color={Colors.gray}
      style={styles.TimesCircle}
    />
  )
}

export default TimesCircle

const styles = StyleSheet.create({
  TimesCircle: {
    elevation: 3,
  },
})
