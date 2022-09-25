import React, { useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
} from 'react-native'
import Text from '../Text/Text'
import View from '../View/View'
import CameraSVG from '../../assets/images/camera.svg'
import Colors from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { useController } from 'react-hook-form'
import Constants from 'expo-constants'

type UploadImageProps = ViewProps & {
  listMax?: number
  name: string
  control: any
}

function UploadImage({
  style,
  listMax = 6,
  name,
  control,
  ...rest
}: UploadImageProps) {
  const [list, setList] = useState<string[]>([])

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  })

  async function handleCameraPermission() {
    if (Constants?.platform?.ios) {
      const cameraRollStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
      if (
        cameraRollStatus.status !== 'granted' ||
        cameraStatus.status !== 'granted'
      ) {
        alert('Sorry, we need these permissions to make this work!')
        return false
      }
    }

    return true
  }

  const handleChoosePhoto = async () => {
    const grantedPermission = await handleCameraPermission()

    if (!grantedPermission) return

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    })

    const item = (result || {}) as ImagePicker.ImageInfo

    if (!result.cancelled) {
      // @ts-ignore
      setList(prev => {
        const newList = Array.isArray(item) ? item : [item.uri, ...prev]

        onChange(newList)
        return newList
      })
    }
  }

  const { onChange } = field

  return (
    <ScrollView style={styles.Container} horizontal={true}>
      {list.length <= listMax && (
        <TouchableOpacity onPress={handleChoosePhoto}>
          <View style={[styles.Input, styles.ImageItem]} {...rest}>
            <CameraSVG style={styles.Icon} />
            <Text style={styles.Title}>Inclua fotos</Text>
            <Text>{!!listMax && `${list.length} de ${listMax}`}</Text>
          </View>
        </TouchableOpacity>
      )}
      {list.map((uri, idx) => (
        <Image key={uri + idx} style={[styles.ImageItem]} source={{ uri }} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  ImageItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    width: 150,
    height: 150,
    marginRight: 16,
  },
  Input: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.text,
    backgroundColor: Colors.lightBackground,
  },
  MinInput: {
    width: 100,
    height: 100,
  },
  Icon: {
    marginRight: -7,
    marginBottom: 8,
  },
  Title: {
    color: Colors.secondaryColor,
  },
})

export default UploadImage
