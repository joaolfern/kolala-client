import React from 'react'
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native'
import Span from '../Span/Span'
import blankProfile from '../../assets/images/blank-profile.png'
import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'

export type IAvatar = Omit<ImageProps, 'source'> & {
  source: ImageSourcePropType | undefined
}

function Avatar({ style, source, ...rest }: IAvatar) {
  return (
    <Span style={styles.pictureWrapper}>
      <Image
        {...rest}
        style={[styles.picture, style]}
        source={source || blankProfile}
      />
    </Span>
  )
}

const styles = StyleSheet.create({
  picture: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: 51,
    height: 51,
  },
  pictureWrapper: {
    borderRadius: 99999,
    overflow: 'hidden',
  },
})

export default Avatar
