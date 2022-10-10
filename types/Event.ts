import { ImageInfo } from 'expo-image-picker'
import { IAtendee } from './Atendee'
import { IProfile } from './Profile'

export namespace IEvent {

  export interface Model {
    id: number
    createdAt: Date
    title: string
    description: string
    category: number
    status: number
    EventImage: Image[]
    authorId: number
    datetime: Date
    lat: number
    lng: number
    author: IProfile
    Atendee: IAtendee[]
  }

  export interface IEventSections {
    title: string
    data: ListItem[]
  }

  export interface Details extends Model {

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


