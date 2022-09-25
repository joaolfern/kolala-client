import { ImageInfo } from 'expo-image-picker'

export interface IEvent {
  id: number
  createdAt: Date
  title: string
  description: string
  category: number
  status: number
  image: string[]
  authorId: number
  datetime: Date
  lat: number
  lng: number
}

export interface IEventFormSubmitEvent {
  title: string
  image: string[]
  category: number
  datetime: Date
  description: string
  location: {
    lat: number
    lng: number
  }
}
