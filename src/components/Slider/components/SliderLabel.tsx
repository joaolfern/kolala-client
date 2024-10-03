import type { ReactNode } from 'react'
import { memo } from 'react'
import type { ViewProps } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import Colors from '@/constants/Colors'

interface IProps extends ViewProps {
  text: ReactNode
}

const Label = ({ text, ...restProps }: IProps) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 4,
    transform: [{ translateY: 20 }],
  },
  text: {
    fontSize: 16,
    color: '#010101',
  },
})

export default memo(Label)
