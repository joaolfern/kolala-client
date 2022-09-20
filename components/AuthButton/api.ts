import api from '../../services/api'
import { Fetch } from '../../services/Fetch'
import { Profile } from '../../types/Profile'
import { UserLoginResponse } from '../../types/User'

export const sendAccessTokenRequest = async (data: { accessToken: string }) => (
  await Fetch<{ user: UserLoginResponse, token: string, profile: Profile }>(
    () => api.post('unauth/access-token', data)
  )
)
