import type { AxiosRequestConfig } from "axios";

import api from "../services/api";
import { Fetch } from "../services/Fetch";
import type { IProfile } from "../types/Profile";

class Message {
  private path = "auth/chat";

  async list(eventId: number, config: AxiosRequestConfig & { params: any }) {
    return Fetch<IMessage[]>(() => api.get(`${this.path}/${eventId}`, config));
  }
}

export interface IMessage {
  id: number;
  authorId: number;
  author: IProfile;
  eventId: number;
  content: string;
  answerToId?: number;
  answerTo?: IMessage;
  createdAt: string;
}

export interface ISendMessageRequest {
  eventId: number;
  content: string;
  answerToId?: number;
}

export default new Message();
