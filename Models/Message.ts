import { IProfile } from '../types/Profile'

export interface IMessage {
  id: number
  authorId: number
  author: IProfile
  eventId: number
  content: string
  answerToId?: number
  answerTo?: IMessage
  createdAt: string
}
