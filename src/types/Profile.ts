import type { IUser } from './User'

export type IProfile = {
  facebookAccount?: string
  id: number
  instagramAccount?: string
  name: string
  picture: string
  twitterAccount?: string
}

export type IProfileViewData = IProfile & {
  User?: IUser
}
