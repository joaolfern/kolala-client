import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import Compass from '../../assets/images/compass.svg'
import Span from '../Span/Span'

type IProps = TouchableOpacityProps & {}

function HomeButton({ ...rest }: IProps) {
  return (
    <TouchableOpacity
      style={styles.Button}
      onPressIn={() => console.log('eooo')}
    >
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
