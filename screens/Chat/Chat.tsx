import { useFocusEffect, useNavigationState } from '@react-navigation/native'
import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import {
  Control,
  useForm,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form'
import { FlatList, StyleSheet } from 'react-native'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Colors from '../../constants/Colors'
import { IEvent } from '../../Models/Event'
import Message, { IMessage } from '../../Models/Message'
import ws, { ISendMessageArgs } from '../../services/socket'
import { useAppSelector } from '../../store/hooks'
import { selectToken } from '../../store/tokenSlice'
import { selectUser } from '../../store/userSlice'
import { RootStackParamList } from '../../types'
import ChatContent from './components/ChatContent'
import ChatFooter from './components/ChatFooter'
import ChatHeader from './components/ChatHeader'

type IContext = {
  event: null | IEvent.ListItem
  messages: IMessage[]
  sendMessage(args: ISendMessageArgs): void
  control: Control<ISendMessageArgs, any> | null
  handleSubmit: Function
  setValue: UseFormSetValue<ISendMessageArgs>
}

const initialState: IContext = {
  event: null,
  messages: [],
  sendMessage: () => {},
  control: null,
  handleSubmit: () => {},
  setValue: () => {},
}

export const ChatContext = createContext(initialState)

function Chat() {
  const { token } = useAppSelector(selectToken)
  const { user } = useAppSelector(selectUser)
  const { event } = useNavigationState(
    state =>
      state.routes.find(item => item.name === 'Chat')
        ?.params as RootStackParamList['Chat']
  )
  const { control, reset, handleSubmit, setValue } = useForm<ISendMessageArgs>()
  const [messages, setMessages] = useState<IMessage[]>([])

  const scrollRef = useRef<FlatList | null>(null)
  const params = useRef({
    page: 1,
  })

  function focusBottom() {
    scrollRef.current?.scrollToOffset?.({ offset: 0 })
  }

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

      reset({ answerToId: undefined, content: '' })
    } catch (err) {
      console.error(err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (event.id ?? true) {
        ws.initialize({ token, eventId: event.id })

        ws.onNewMessage((newMessage: IMessage) => {
          setMessages(prev => [newMessage, ...prev])
          if (newMessage.authorId === user?.id) focusBottom()
        })

        ws.onDeleteMessageFromDisplay(id => {
          setMessages(prev => prev.filter(message => message.id !== id))
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
    control,
    handleSubmit,
    setValue,
  }

  return (
    <SafeAreaView style={styles.Container}>
      <ChatContext.Provider value={context}>
        <ChatHeader />
        <ChatContent ref={scrollRef} />
        <ChatFooter />
      </ChatContext.Provider>
    </SafeAreaView>
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
