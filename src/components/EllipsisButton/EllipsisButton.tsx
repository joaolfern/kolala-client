import { FontAwesome5 } from '@expo/vector-icons'
import type { TouchableOpacityProps } from 'react-native'
import { StyleSheet } from 'react-native'

import Colors from '@/constants/Colors'
import Button from '../Button/Button'

interface IEllipsisButton extends TouchableOpacityProps {
  onPress(): void
}

function EllipsisButton({ style, onPress }: IEllipsisButton) {
  return (
    <Button style={[styles.EllipsisButton, style]} onPress={onPress}>
      <FontAwesome5 size={20} name='ellipsis-v' solid color={Colors.gray} />
    </Button>
  )
}

export default EllipsisButton

const styles = StyleSheet.create({
  EllipsisButton: {
    width: 48,
    height: 48,
    borderRadius: 99999999,
    backgroundColor: Colors.xLightBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
