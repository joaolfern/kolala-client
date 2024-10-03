import { Image, ImageProps, StyleSheet } from 'react-native'

// @ts-ignore
import spinner from '@/assets/images/spinner-white.gif'

interface IProps extends ImageProps {}

function Spinner({ style, ...rest }: IProps) {
  return <Image style={[styles.Image, style]} source={spinner} {...rest} />
}

export default Spinner

const styles = StyleSheet.create({
  Image: {
    width: 30,
    height: 30,
  },
})
