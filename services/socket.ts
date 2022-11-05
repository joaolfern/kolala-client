import { io } from "socket.io-client";

class WSService {
  instance: ReturnType<typeof io> | null = null

  initialize (token: string) {
    this.instance = io("http://192.168.1.6:3333", {
      transports: ['websocket', 'polling'],
      auth: {
        token
      }
    })
  }

  joinChat (eventId: number) {
    this.instance?.emit?.('joinChat', eventId)
  }

  sendMessage (args: ISendMessageArgs) {
    this.instance?.emit?.('sendMessage', args)
  }

  onNewMessage (cb: (args: any) => void) {
    this.instance?.on?.('newMessage', cb)
  }

  disconnect () {
    this?.instance?.disconnect?.()
  }
}

export type ISendMessageArgs = { content: string, answerToId?: number }

const ws = new WSService()

export default ws
