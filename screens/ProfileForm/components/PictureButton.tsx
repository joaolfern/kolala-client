import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Avatar from '../../../components/Avatar/Avatar'
import Colors from '../../../constants/Colors'
import useAskForImages from '../../../hooks/useAskForImages'
import { IProfileViewData } from '../../../types/Profile'
import { ProfileFormEvent } from '../ProfileForm'
import * as ImagePicker from 'expo-image-picker'
import { Control, useController } from 'react-hook-form'

interface IProps {
  name: keyof ProfileFormEvent
  control: Control<ProfileFormEvent>
  defaultValue?: string
}

function PictureButton({ control, name, defaultValue }: IProps) {
  const { field } = useController({
    name,
    control,
    defaultValue,
  })
  const { onChange, value } = field
  const { handleCameraPermission } = useAskForImages()

  async function launchGallery() {
    const grantedPermission = await handleCameraPermission()
    if (!grantedPermission) return

    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1,
      allowsMultipleSelection: false,
    })) as ImagePicker.ImageInfo | ImagePicker.ImagePickerMultipleResult

    if (!result.cancelled) {
      const uriItem = (result as ImagePicker.ImageInfo).uri
      onChange(uriItem)
    }
  }

  return (
    <TouchableOpacity style={styles.PictureButton} onPress={launchGallery}>
      <MaterialIcons
        style={styles.PictureIcon}
        name='camera-alt'
        size={30}
        color={Colors.text}
      />
      <Avatar
        style={styles.Picture}
        source={value ? { uri: value as string } : undefined}
      />
    </TouchableOpacity>
  )
}

export default PictureButton

const styles = StyleSheet.create({
  Picture: {
    width: 150,
    height: 150,
  },
  PictureButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  PictureIcon: {
    position: 'absolute',
    zIndex: 10,
  },
})
