import { Item } from 'react-native-picker-select'
import coffee from '../../assets/mapIcons/coffee.png'
import music from '../../assets/mapIcons/music.png'
import workout from '../../assets/mapIcons/workout.png'
import announcement from '../../assets/mapIcons/announcement.png'
import { ImageURISource } from 'react-native'
import { asResource } from './utils'

export const CATEGORY_RESOURCE: Item[] = [{ label: 'Música', value: 0 }]

export const MAP_ICONS: { [key: number]: ImageURISource } = {
  0: coffee,
  1: music,
  2: workout,
  3: announcement,
}

export const MAP_ICONS_RESOURCE = asResource(MAP_ICONS)
