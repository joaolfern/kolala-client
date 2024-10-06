import type { TouchableOpacityProps } from 'react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Compass from '@/assets/images/compass.svg'

type IProps = TouchableOpacityProps & {}

function HomeButton({ ...rest }: IProps) {
  return (
    <TouchableOpacity style={styles.Button} {...rest}>
      <Compass />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Button: {
    marginTop: 'auto',
    zIndex: 1,
    height: 50,
    width: 50,
    marginBottom: 16,
  },
})

export default HomeButton
