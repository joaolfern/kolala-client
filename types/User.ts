import { IProfile } from './Profile'

export type _userLevel = 'user' | 'admin'

export interface IAccount {
  id: number
  email: string
  status: number
  authMethod: string
  authKey: string
  level: _userLevel
}

export type IUser = IAccount & { profile: IProfile }
