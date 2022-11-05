import { useFocusEffect, useNavigationState } from '@react-navigation/native'
import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Colors from '../../constants/Colors'
import { IEvent } from '../../Models/Event'
import Message, { IMessage } from '../../Models/Message'
import ws, { ISendMessageArgs } from '../../services/socket'
import { useAppSelector } from '../../store/hooks'
import { selectToken } from '../../store/tokenSlice'
import { selectUser } from '../../store/userSlice'
import { RootStackParamList } from '../../types'
import { IProfile } from '../../types/Profile'
import ChatContent from './components/ChatContent'
import ChatFooter from './components/ChatFooter'
import ChatHeader from './components/ChatHeader'

type IContext = {
  event: null | IEvent.ListItem
  messages: IMessage[]
  sendMessage(args: ISendMessageArgs): void
}

const initialState: IContext = {
  event: null,
  messages: [],
  sendMessage: () => {},
}

export const ChatContext = createContext(initialState)

function Chat() {
  const { token } = useAppSelector(selectToken)
  const { user } = useAppSelector(selectUser)

  const [messages, setMessages] = useState<IMessage[]>([])
  const { event } = useNavigationState(
    state =>
      state.routes.find(item => item.name === 'Chat')
        ?.params as RootStackParamList['Chat']
  )

  const params = useRef({
    page: 1,
  })

  useEffect(() => {
    async function getMessages(newParams: object) {
      const requestParams = {
        ...params.current,
        ...newParams,
      }

      params.current = requestParams

      const config = { params: requestParams }

      try {
        const response = await Message.list(event?.id as number, config)
        const { data } = response.data

        const isFirstPage = requestParams.page === 1
        if (data && Array.isArray(data)) {
          setMessages(prev => (isFirstPage ? data : [...data, ...prev]))
        }
      } catch (err) {
        console.error(err)
      }
    }

    getMessages(params.current)
  }, [])

  async function sendMessage(args: ISendMessageArgs) {
    try {
      ws.sendMessage(args)
      const constructedMessage: IMessage = {
        author: user?.profile as IProfile,
        authorId: user?.id as number,
        ...args,
        ...(args.answerToId ?? true
          ? [
              {
                answerTo: messages.find(
                  message => message.id === args.answerToId
                ),
              },
            ]
          : []),
        createdAt: new Date().toDateString(),
        eventId: event.id,
        id: (messages?.slice?.(-1)?.[0]?.id || -1) + 1,
      }

      setMessages(prev => [...prev, constructedMessage])
    } catch (err) {
      console.error(err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (event.id ?? true) {
        ws.initialize({ token, eventId: event.id })

        ws.onNewMessage((newMessage: IMessage) => {
          setMessages(prev => [...prev, newMessage])
        })
      }

      return () => {
        ws.disconnect()
      }
    }, [event.id, token])
  )

  const context = {
    event,
    messages,
    sendMessage,
  }

  return (
    <ChatContext.Provider value={context}>
      <SafeAreaView style={styles.Container}>
        <ChatHeader />
        <ChatContent />
        <ChatFooter />
      </SafeAreaView>
    </ChatContext.Provider>
  )
}

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 16,
    backgroundColor: Colors.background,
    height: '100%',
  },
})

export default Chat
