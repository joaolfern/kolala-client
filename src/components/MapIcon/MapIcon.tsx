import { useController } from 'react-hook-form'
import type { ImageURISource } from 'react-native'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

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
    defaultValue: MAP_ICONS_RESOURCE[0].label,
  })

  const { onChange, value: selectedIcon } = field

  return (
    <ScrollView horizontal style={styles.Container}>
      {MAP_ICONS_RESOURCE.map(({ label: key, value: icon }, idx) => {
        return (
          <TouchableOpacity
            key={key + idx}
            style={[
              styles.Item,
              idx !== MAP_ICONS_RESOURCE.length - 1 && styles.ItemMargin,
              selectedIcon == key && styles.ItemSelect,
            ]}
            onPress={() => {
              onChange(key)
            }}
          >
            <Image style={styles.ItemImage} source={icon as ImageURISource} />
          </TouchableOpacity>
        )
      })}
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
  },
  ItemMargin: {
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
