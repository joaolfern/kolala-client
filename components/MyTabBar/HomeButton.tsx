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
    <Span style={styles.Wrapper}>
      <TouchableOpacity
        accessibilityRole='button'
        style={styles.Button}
        {...rest}
      >
        <Compass />
      </TouchableOpacity>
    </Span>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Button: {},
  Icon: {
    aspectRatio: 1,
    width: 51,
    height: 51,
  },
})

export default HomeButton
