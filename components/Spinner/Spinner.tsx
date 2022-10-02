import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Span from '../Span/Span'
// @ts-ignore
import spinner from '../../assets/images/spinner-white.gif'
import { ImageProps } from 'react-native-svg'

interface IProps extends ImageProps {
  style?: any
}

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
