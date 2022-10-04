import React from 'react'
import { useController } from 'react-hook-form'
import {
  Image,
  ImageURISource,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Colors from '../../constants/Colors'
import { MAP_ICONS_RESOURCE } from '../../screens/EventForm/constants'

type IProps = {
  name: string
  control: any
}

function MapIcon({ name, control }: IProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: MAP_ICONS_RESOURCE[0].value,
  })

  const { onChange, value: selectedIcon } = field

  return (
    <ScrollView horizontal={true} style={styles.Container}>
      {MAP_ICONS_RESOURCE.map(({ label, value }) => (
        <TouchableOpacity
          key={label}
          style={[styles.Item, selectedIcon === value && styles.ItemSelect]}
          onPress={() => onChange(value)}
        >
          <Image style={styles.ItemImage} source={value as ImageURISource} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  Item: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBackground,
    borderRadius: 13,
    width: 91,
    height: 69,
    marginRight: 19,
  },
  ItemSelect: {
    backgroundColor: Colors.secondaryColor,
  },
  ItemImage: {
    maxHeight: 60,
  },
})

export default MapIcon
