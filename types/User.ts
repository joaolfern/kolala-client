export type _userLevel = 'user' | 'admin'

export interface IAccount {
  id: number
  email: string
  status: number
  authMethod: string
  authKey: string
  level: _userLevel
}
