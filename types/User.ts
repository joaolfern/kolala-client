export type _userLevel = 'user' | 'admin'

export type UserLoginResponse = {
  authKey: string,
  authMethod: string
  email: string
  id: number
  level: _userLevel,
  status: 1,
}