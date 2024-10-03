import { FontAwesome5 } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import type { ViewProps } from 'react-native'
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'

import CameraSVG from '@/assets/images/camera.svg'
import Colors from '@/constants/Colors'
import useAskForImages from '@/hooks/useAskForImages'
import type { IEvent } from '@/Models/Event'
import Span from '../Span/Span'
import Text from '../Text/Text'
import View from '../View/View'

type ImageItemProps = {
  item: IEvent.Image
  remove(id: string): void
  isLastItem: boolean
}

function ImageItem({ item, remove, isLastItem }: ImageItemProps) {
  return (
    <Span
      style={[
        styles.ImageItemWrapper,
        !isLastItem ? styles.ImageItemWrapperMargin : {},
      ]}
    >
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
  const listRef = useRef<FlatList>(null)
  const { handleCameraPermission } = useAskForImages()

  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue.map((image) => image.url),
  })

  const handleChoosePhoto = async () => {
    const grantedPermission = await handleCameraPermission()
    if (!grantedPermission) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: listMax - list.length,
      allowsMultipleSelection: true,
    })

    if (!result.canceled) {
      const uriList = result.assets
      const formattedList = uriList
        .map((item) => {
          const formattedItem = {
            id: String(item.uri) + counter,
            url: item.uri,
          }
          counter++
          return formattedItem
        })
        .slice(0, listMax - list.length)
      setList((prev) => {
        const stateList: IEvent.Image[] = [...formattedList, ...prev]
        counter++

        const eventList = stateList.map((item) => item.url)
        onChange(eventList)
        return stateList
      })
    }
  }

  function remove(id: string) {
    setList((prev) => {
      const newList = prev.filter((item) => item.id !== id)

      const eventList = newList.map((item) => item.url)
      onChange(eventList)
      listRef?.current?.scrollToIndex?.({ index: list.length - 1 })

      return newList
    })
  }

  const { onChange } = field

  return (
    <FlatList
      ref={listRef}
      ListHeaderComponent={
        <>
          {list.length < listMax && (
            <TouchableOpacity onPress={handleChoosePhoto}>
              <View style={[styles.Input, styles.ImageItem]} {...rest}>
                <CameraSVG style={styles.Icon} />
                <Text style={styles.Title}>Inclua fotos</Text>
                <Text>{!!listMax && `${list.length} de ${listMax}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      }
      data={list}
      horizontal
      renderItem={({ item, index }) => (
        <ImageItem
          item={item}
          remove={remove}
          key={item.url}
          isLastItem={index === list.length - 1}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
  },
  ImageItemWrapper: {
    position: 'relative',
  },
  ImageItemWrapperMargin: {
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
