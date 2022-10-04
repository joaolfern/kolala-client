

import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import { Fetch } from '../../services/Fetch'
import { ICONS_RESOURCE } from './constants'

export interface IMarkers {
  lat: number
  lng: number
  icon: keyof typeof ICONS_RESOURCE
}

interface IConfig extends AxiosRequestConfig {
  params: {
    lat: number
    lng: number
  }
}

export const getMarkers = async (config: IConfig) => (
  await Fetch<IMarkers[]>(
    () => api.get('auth/events/map', config)
  )
)
