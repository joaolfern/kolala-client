import { AxiosRequestConfig } from 'axios'
import { MAP_ICONS } from '../screens/EventForm/constants'
import api from '../services/api'
import { Fetch } from '../services/Fetch'
import { IAtendee } from '../types/Atendee'
import { IProfile } from '../types/Profile'

namespace EventRequestConfig {
  export interface IGetMarkers extends AxiosRequestConfig {
    params: {
      lat: number
      lng: number
    }
  }
}



class Event {
  private path = 'auth/events'

  async getDetails(id: number) {
    return await Fetch<IEvent.Details>(() => api.get(`${this.path}/${id}`))
  }

  async getList() {
    return await Fetch<IEvent.IEventSections[]>(() => api.get(this.path))
  }

  async getParticipants(id: number) {
    return await Fetch<IEvent.IEventSections[]>(() =>
      api.get(`${this.path}/${id}/participants`)
    )
  }

  async getMarkers(config: EventRequestConfig.IGetMarkers) {
    return await Fetch<IEvent.IMarkers[]>(() =>
      api.get(`${this.path}/map`, config)
    )
  }

  async listEvents () {
    return await Fetch<IEvent.IEventSections[]>(() => api.get(this.path))
  }

  async createEvent (data: FormData) {
    return (
      await Fetch<{}>(
        () => api.post('auth/events', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      )
    )
  }
}

export default new Event()

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
    icon: keyof typeof MAP_ICONS
  }

  export interface IEventSections {
    title: string
    data: ListItem[]
  }

  export interface Details extends Model {}

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
    icon: number
    location: {
      lat: number
      lng: number
    }
  }

  export interface Image {
    id: number | string
    url: string
  }

  export interface IMarkers {
    id: number
    lat: number
    lng: number
    icon: keyof typeof MAP_ICONS
    title: string
  }
}