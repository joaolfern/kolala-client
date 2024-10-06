import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native'

import spinner from '@/assets/images/spinner-white.gif'

function Spinner({ style, ...rest }: ImageProps) {
  return (
    <Image
      style={[styles.Image, style]}
      source={spinner as ImageSourcePropType}
      {...rest}
    />
  )
}

export default Spinner

const styles = StyleSheet.create({
  Image: {
    width: 30,
    height: 30,
  },
})
