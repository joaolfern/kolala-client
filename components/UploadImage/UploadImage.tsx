import React, { useRef, useState } from 'react'
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
import Span from '../Span/Span'
import { IEvent } from '../../types/Event'
import { FontAwesome5 } from '@expo/vector-icons'

type ImageItemProps = {
  item: IEvent.Image
  remove(id: string): void
}

function ImageItem({ item, remove }: ImageItemProps) {
  return (
    <Span style={styles.ImageItemWrapper}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => remove(item.id as string)}
      >
        <FontAwesome5
          size={30}
          name='times-circle'
          solid
          color={Colors.secondaryColor}
          style={styles.closeButtonIcon}
        />
      </TouchableOpacity>
      <Image style={[styles.ImageItem]} source={{ uri: item.url }} />
    </Span>
  )
}

type UploadImageProps = ViewProps & {
  listMax?: number
  name: string
  control: any
  defaultValue?: IEvent.Image[]
}

let counter = 0

function UploadImage({
  style,
  listMax = 6,
  name,
  control,
  defaultValue = [],
  ...rest
}: UploadImageProps) {
  const [list, setList] = useState<IEvent.Image[]>(defaultValue)

  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue.map(image => image.url),
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

    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: listMax - list.length,
      allowsMultipleSelection: true,
    })) as ImagePicker.ImageInfo | ImagePicker.ImagePickerMultipleResult

    if (!result.cancelled) {
      const uriList = 'selected' in result ? result.selected : [result]
      const formattedList = uriList
        .map(item => {
          const formattedItem = {
            id: String(item.uri) + counter,
            url: item.uri,
          }
          counter++
          return formattedItem
        })
        .slice(0, listMax - list.length)
      setList(prev => {
        const stateList: IEvent.Image[] = [...formattedList, ...prev]
        counter++

        const eventList = stateList.map(item => item.url)
        onChange(eventList)
        return stateList
      })
    }
  }

  function remove(id: string) {
    setList(prev => {
      const newList = prev.filter(item => item.id !== id)

      const eventList = newList.map(item => item.url)
      onChange(eventList)
      return newList
    })
  }

  const { onChange, value } = field

  return (
    <ScrollView style={styles.Container} horizontal={true}>
      {list.length < listMax && (
        <TouchableOpacity onPress={handleChoosePhoto}>
          <View style={[styles.Input, styles.ImageItem]} {...rest}>
            <CameraSVG style={styles.Icon} />
            <Text style={styles.Title}>Inclua fotos</Text>
            <Text>{!!listMax && `${list.length} de ${listMax}`}</Text>
          </View>
        </TouchableOpacity>
      )}
      {list.map((item, idx) => (
        <ImageItem item={item} remove={remove} key={item.url + idx} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  ImageItemWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  ImageItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    width: 150,
    height: 150,
    position: 'relative',
  },
  Input: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.text,
    backgroundColor: Colors.lightBackground,
    marginRight: 16,
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
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 2,
  },
  closeButtonIcon: {
    elevation: 3,
  },
})

export default UploadImage
