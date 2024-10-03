import { useFocusEffect, useNavigationState } from '@react-navigation/native'
import type { ReactNode, Ref } from 'react'
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import type { Control, UseFormSetValue } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { FlatList, TextInput as DefaultTextInput } from 'react-native'
import { StyleSheet } from 'react-native'

import Colors from '@/constants/Colors'
import type { IEvent } from '@/Models/Event'
import type { IMessage } from '@/Models/Message'
import Message from '@/Models/Message'
import type { ISendMessageArgs } from '@/services/socket'
import ws from '@/services/socket'
import { useAppSelector } from '@/store/hooks'
import { selectToken } from '@/store/tokenSlice'
import { selectUser } from '@/store/userSlice'
import type { RootStackParamList } from '@/types/'

type IContext = {
  event: null | IEvent.ListItem
  messages: IMessage[]
  sendMessage(args: ISendMessageArgs): void
  control: Control<ISendMessageArgs, any> | null
  handleSubmit: Function
  setValue: UseFormSetValue<ISendMessageArgs>
  inputRef: Ref<DefaultTextInput> | null
  focusInput(): void
  setScrollRef: (ref: FlatList) => void
}

const initialState: IContext = {
  event: null,
  messages: [],
  sendMessage: () => {},
  control: null,
  handleSubmit: () => {},
  setValue: () => {},
  inputRef: null,
  focusInput: () => {},
  setScrollRef: () => {},
}

export const ChatContext = createContext(initialState)

interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const token = useAppSelector(selectToken)
  const { user } = useAppSelector(selectUser)
  const { event } = useNavigationState(
    (state) =>
      state.routes.find((item) => item.name === 'Chat')
        ?.params as RootStackParamList['Chat']
  )
  const { control, reset, handleSubmit, setValue } = useForm<ISendMessageArgs>()
  const [messages, setMessages] = useState<IMessage[]>([])

  const inputRef = useRef<DefaultTextInput | null>(null)
  const scrollRef = useRef<FlatList | null>(null)
  const params = useRef({
    page: 1,
  })

  function focusBottom() {
    scrollRef.current?.scrollToOffset?.({ offset: 0 })
  }

  function focusInput() {
    inputRef.current?.focus()
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
          setMessages((prev) => (isFirstPage ? data : [...data, ...prev]))
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
          setMessages((prev) => [newMessage, ...prev])
          if (newMessage.authorId === user?.id) focusBottom()
        })

        ws.onDeleteMessageFromDisplay((id) => {
          setMessages((prev) => prev.filter((message) => message.id !== id))
        })
      }

      return () => {
        ws.disconnect()
      }
    }, [event.id, token])
  )

  function setScrollRef(newScrollRef: FlatList) {
    scrollRef.current = newScrollRef
  }

  const context = {
    event,
    messages,
    sendMessage,
    control,
    handleSubmit,
    setValue,
    inputRef,
    focusInput,
    setScrollRef,
  }

  return <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
}

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 16,
    backgroundColor: Colors.background,
    height: '100%',
  },
})
