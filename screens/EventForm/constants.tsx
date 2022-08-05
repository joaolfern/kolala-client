import { Item } from 'react-native-picker-select'
import coffee from '../../assets/mapIcons/coffee.png'
import music from '../../assets/mapIcons/music.png'
import workout from '../../assets/mapIcons/workout.png'
import announcement from '../../assets/mapIcons/announcement.png'

export const CATEGORY_RESOURCE: Item[] = [{ label: 'Música', value: 'music' }]

export const MAP_ICONS_RESOURCE: Item[] = [
  { label: coffee, value: 'coffee' },
  { label: music, value: 'music' },
  { label: workout, value: 'workout' },
  { label: announcement, value: 'announcement' },
]
