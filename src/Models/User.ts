import api from '../services/api'
import { Fetch } from '../services/Fetch'
import type { IProfileViewData } from '../types/Profile'
import type { UserLevel } from '../types/User'

export type IUserPromoteConfig = {
  targetId: number
  body: {
    level: UserLevel
  }
}

export type IUserUpdateProfileConfig = {
  body: FormData
  id: number
}

export type IUserUpdateStatus = {
  body: {
    status: number
  }
  targetId: number
}

class User {
  private path = 'auth/users'

  async getProfile(id: number) {
    return Fetch<IProfileViewData>(() => api.get(`${this.path}/profile/${id}`))
  }

  async updateProfile({ body, id }: IUserUpdateProfileConfig) {
    return Fetch<string>(() =>
      api.patch(`${this.path}/profile/${id}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data, headers) => {
          return body
        },
      })
    )
  }

  async promote({ targetId, body }: IUserPromoteConfig) {
    return Fetch<string>(() =>
      api.post(`${this.path}/promote/${targetId}`, body)
    )
  }

  async updateStatsus({ body, targetId }: IUserUpdateStatus) {
    return Fetch(() => api.patch(`${this.path}/status/${targetId}`, body))
  }
}

export default new User()
