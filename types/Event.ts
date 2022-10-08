import { ImageInfo } from 'expo-image-picker'

export namespace IEvent {

  export interface Model {
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

  export interface IEventSections {
    title: string
    data: ListItem[]
  }

  export interface ListItem {
    id: number
    createdAt: Date
    title: string
    description: string
    category: number
    status: number
    image: string
    authorId: number
    datetime: Date
    lat: number
    lng: number
    memberCount: number
  }

  export interface FormSubmitEvent {
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

  export interface Image {
    id: number | string
    url: string
  }
}


