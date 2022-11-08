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
  body: Partial<IProfile>
  id: number
}

class User {
  async getProfile (id: number) {
    return await Fetch<IProfileViewData>(
      () => api.get(`auth/users/profile/${id}`)
    )
  }

  async updateProfile ({ body, id }: IUserUpdateProfileConfig) {
    return await Fetch<string>(
      () => api.patch(`auth/users/profile/${id}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
    )
  }

  async promote ({ targetId, body }: IUserPromoteConfig)  {
    return await Fetch<string>(
      () => api.post(`auth/users/promote/${targetId}`, body)
    )
  }


}

export default new User()
