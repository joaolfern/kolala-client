import React, { useState } from 'react'
import { Image, StyleSheet, ViewProps } from 'react-native'
import Text from '../Text/Text'
import View from '../View/View'
import CameraSVG from '../../assets/images/camera.svg'
import Colors from '../../constants/Colors'

type UploadImageProps = ViewProps & {
  amount: number
}

function UploadImage({ amount, style, ...rest }: UploadImageProps) {
  const [list, setList] = useState([])

  return (
    <View style={[styles.View, style]} {...rest}>
      <CameraSVG style={styles.Icon} />
      <Text style={styles.Title}>Inclua fotos</Text>
      <Text>{!!amount && `${list.length} de ${amount}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  View: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 13,
    backgroundColor: Colors.lightBackground,
  },
  Icon: {
    marginRight: -7,
    marginBottom: 8,
  },
  Title: {
    color: Colors.secondaryColor,
  },
  Image: {},
})

export default UploadImage
