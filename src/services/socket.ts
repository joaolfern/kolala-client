import { io } from 'socket.io-client'

import { REACT_APP_SERVER } from '../../env'
import { IMessage } from '@/Models/Message'

class WSService {
  instance: ReturnType<typeof io> | null = null

  constructor() {
    this.onNewMessage = this.onNewMessage.bind(this)
  }

  initialize({ token, eventId }: { token: string; eventId: number }) {
    this.instance = io(REACT_APP_SERVER, {
      transports: ['websocket', 'polling'],
      auth: {
        token,
      },
    })

    this.joinChat(eventId)
  }

  joinChat(eventId: number) {
    this.instance?.emit?.('joinChat', { eventId })
  }

  sendMessage(args: ISendMessageArgs) {
    this.instance?.emit?.('sendMessage', args)
  }

  deleteMessage(args: { id: number }) {
    this.instance?.emit?.('deleteMessage', args)
  }

  onDeleteMessageFromDisplay(cb: (id: number) => void) {
    this.instance?.on?.('deleteMessageFromDisplay', cb)
  }

  onNewMessage(cb: (newMessage: IMessage) => void) {
    this.instance?.on?.('newMessage', cb)
  }

  disconnect() {
    this?.instance?.disconnect?.()
  }
}

export type ISendMessageArgs = { content: string; answerToId?: number }

const ws = new WSService()

export default ws
