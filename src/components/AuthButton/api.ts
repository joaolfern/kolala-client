import api from '@/services/api'
import { Fetch } from '@/services/Fetch'
import type { IProfile } from '@/types/Profile'
import type { IAccount } from '@/types/User'

export const sendAccessTokenRequest = async (data: { accessToken: string }) =>
  Fetch<{ token: string; user: IAccount & { profile: IProfile } }>(() =>
    api.post('unauth/login', data)
  )

export const loginWithToken = async (token: string) =>
  Fetch<{ user: IAccount & { profile: IProfile } }>(() =>
    api.post('unauth/login/token', { token })
  )
