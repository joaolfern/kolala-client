import api from '../../services/api'
import { Fetch } from '../../services/Fetch'
import { IProfile } from '../../types/Profile'
import { Account } from '../../types/User'

export const sendAccessTokenRequest = async (data: { accessToken: string }) => (
  await Fetch<{ user: Account, token: string, profile: IProfile }>(
    () => api.post('unauth/access-token', data)
  )
)
