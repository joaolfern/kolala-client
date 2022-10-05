import api from '../../services/api'
import { Fetch } from '../../services/Fetch'
import { IProfile } from '../../types/Profile'
import { IAccount } from '../../types/User'

export const sendAccessTokenRequest = async (data: { accessToken: string }) =>
  await Fetch<{ user: IAccount; token: string; profile: IProfile }>(() =>
    api.post('unauth/access-token', data)
  )

export const loginWithToken = async () =>
  await Fetch<{ user: IAccount & { profile: IProfile } }>(() =>
    api.post('unauth/login/token')
  )
