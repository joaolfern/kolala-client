import { AxiosRequestConfig } from 'axios'
import api from '../services/api'
import { Fetch } from '../services/Fetch'
import { IProfile, IProfileViewData } from '../types/Profile'
import { _userLevel } from '../types/User'

export type IUserPromoteConfig = {
  targetId: number
  body: {
    level: _userLevel
  }
}

class User {
  getProfile = async (id: number) => (
    await Fetch<IProfileViewData>(
      () => api.get(`auth/users/profile/${id}`)
    )
  )
  promote = async ({ targetId, body }: IUserPromoteConfig) => (
    await Fetch<string>(
      () => api.post(`auth/users/promote/${targetId}`, body)
    )
  )
}

export default new User()
