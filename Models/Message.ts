import { AxiosRequestConfig } from 'axios'
import api from '../services/api'
import { Fetch } from '../services/Fetch'
import { IProfile } from '../types/Profile'

class Message {
  private path = 'chat'

  async list (config: AxiosRequestConfig & { params: any }) {
    return (
      await Fetch<IMessage[]>(
        () => api.get(this.path, config)
      )
    )
  }
}

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

export interface ISendMessageRequest {
  eventId: number
  content: string
  answerToId?: number
}

export default new Message()
