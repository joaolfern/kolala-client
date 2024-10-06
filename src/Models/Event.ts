import type { AxiosRequestConfig } from 'axios'

import type { MAP_ICONS } from '../screens/EventForm/constants'
import type { _eventListTypes } from '../screens/Events/Events'
import type { IFilters } from '../screens/FiltersMenu/FiltersMenu'
import api from '../services/api'
import { Fetch } from '../services/Fetch'
import type { IAtendee } from '../types/Atendee'
import type { IProfile } from '../types/Profile'

interface IGetMarkersConfig extends AxiosRequestConfig {
  params: {
    lat: number
    lng: number
  } & IFilters
}
export interface IListRequestParams {
  arePast: boolean
}

export type IListRequestConfig = Omit<AxiosRequestConfig, 'params'> & {
  params: IListRequestParams
}
class Event {
  private path = 'auth/events'

  async getDetails(id: number) {
    return Fetch<IEventDetails>(() => api.get(`${this.path}/${id}`))
  }

  async getList() {
    return Fetch<IEventSections[]>(() => api.get(this.path))
  }

  async getParticipants(id: number) {
    return Fetch<IEventSections[]>(() =>
      api.get(`${this.path}/${id}/participants`)
    )
  }

  async getMarkers(config: IGetMarkersConfig) {
    return Fetch<IMarkers[]>(() => api.get(`${this.path}/map`, config))
  }

  async listEvents(type: _eventListTypes, config: IListRequestConfig) {
    return Fetch<IEventSections>(() =>
      api.get(`${this.path}/list/${type}`, config)
    )
  }

  async create(data: FormData) {
    return Fetch(() =>
      api.post(this.path, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    )
  }

  async update(id: string, data: FormData) {
    return Fetch(() =>
      api.patch(`${this.path}/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    )
  }

  async delete(id: string) {
    return Fetch<string>(() => api.delete(`${this.path}/${id}`))
  }

  async toggleAttendEvent(id: number) {
    return Fetch<string>(() => api.post(`${this.path}/${id}/attend`))
  }
}

export default new Event()

export interface IEventModel {
  id: number
  createdAt: Date
  title: string
  description: string
  category: number
  status: number
  EventImage: IEventImage[]
  authorId: number
  datetime: Date
  lat: number
  lng: number
  address: string
  author: IProfile
  Atendee: IAtendee[]
  icon: keyof typeof MAP_ICONS
}

export interface IEventSections {
  title: string
  data: IEventListItem[]
}

export interface IEventDetails extends IEventModel {
  _count: {
    Message: number
  }
}

export interface IEventListItem extends Omit<IEventModel, 'EventImage'> {
  image: string
}

export interface IEventFormSubmitEvent {
  address?: string
  title: string
  image: string[]
  category: number
  datetime: Date
  description: string
  icon: number
  location: {
    lat: number
    lng: number
    address: string
  }
}

export interface IEventImage {
  id: number | string
  url: string
}

export interface IMarkers {
  id: number
  lat: number
  lng: number
  icon: keyof typeof MAP_ICONS
  title: string
  address: string
  datetime: string
}
