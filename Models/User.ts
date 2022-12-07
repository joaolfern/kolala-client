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

  async getProfile (id: number) {
    return await Fetch<IProfileViewData>(
      () => api.get(`${this.path}/profile/${id}`)
    )
  }

  async updateProfile ({ body, id }: IUserUpdateProfileConfig) {
    return await Fetch<string>(
      () => api.patch(`${this.path}/profile/${id}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data, headers) => {
          return body
        },
      })
    )
  }

  async promote ({ targetId, body }: IUserPromoteConfig)  {
    return await Fetch<string>(
      () => api.post(`${this.path}/promote/${targetId}`, body)
    )
  }

  async updateStatsus ({ body, targetId }: IUserUpdateStatus) {
    return await Fetch(
      () => api.patch(`${this.path}/status/${targetId}`, body)
    )
  }
}

export default new User()
