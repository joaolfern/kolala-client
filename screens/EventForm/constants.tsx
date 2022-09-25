import { Item } from 'react-native-picker-select'
import coffee from '../../assets/mapIcons/coffee.png'
import music from '../../assets/mapIcons/music.png'
import workout from '../../assets/mapIcons/workout.png'
import announcement from '../../assets/mapIcons/announcement.png'

export const CATEGORY_RESOURCE: Item[] = [{ label: 'Música', value: 0 }]

export const MAP_ICONS_RESOURCE: Item[] = [
  { label: coffee, value: 0 },
  { label: music, value: 1 },
  { label: workout, value: 2 },
  { label: announcement, value: 3 },
]
