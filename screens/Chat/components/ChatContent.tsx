import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import Scroll from '../../../components/Scroll/Scroll'
import Span from '../../../components/Span/Span'
import Message, { IMessage } from '../../../Models/Message'
import ws from '../../../services/socket'
import ChatMessage from './ChatMessage'

const MESSAGE_MOCK: IMessage[] = [
  {
    id: 1,
    authorId: 1,
    eventId: 1,
    content: 'Teste de uma mensaagem no evento',
    author: {
      id: 1,
      name: 'Arnaldo',
      picture: 'https://thispersondoesnotexist.com/image',
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 4,
    authorId: 1,
    eventId: 1,
    content: 'Segunda mensagem',
    author: {
      id: 1,
      name: 'Arnaldo',
      picture: 'https://thispersondoesnotexist.com/image',
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 2,
    authorId: 2,
    eventId: 1,
    content: 'Aqui está uma mensagem da conta que está logada no meu celular',
    author: {
      id: 2,
      name: 'O nome',
      picture: 'https://thispersondoesnotexist.com/image',
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 3,
    authorId: 1,
    eventId: 1,
    content: 'E essa é uma resposta de uma mensagem evento',
    answerToId: 1,
    author: {
      id: 1,
      name: 'Arnaldo',
      picture: 'https://thispersondoesnotexist.com/image',
    },
    answerTo: {
      id: 1,
      authorId: 1,
      eventId: 1,
      content: 'Teste de uma mensaagem no evento',
      author: {
        id: 1,
        name: 'Arnaldo',
        picture: 'https://thispersondoesnotexist.com/image',
      },
      createdAt: new Date().toDateString(),
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 66,
    authorId: 1,
    eventId: 1,
    content: 'Teste de uma mensaagem no evento',
    author: {
      id: 1,
      name: 'Arnaldo',
      picture: 'https://thispersondoesnotexist.com/image',
    },
    createdAt: new Date().toDateString(),
  },
  {
    id: 55,
    authorId: 2,
    eventId: 1,
    content: 'Aqui está uma mensagem da conta que está logada no meu celular',
    author: {
      id: 2,
      name: 'O nome',
      picture: 'https://thispersondoesnotexist.com/image',
    },
    createdAt: new Date().toDateString(),
  },
]

interface IProps {}

function ChatContent({}: IProps) {
  const [messages, setMessages] = useState<IMessage[]>(MESSAGE_MOCK)
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
        const response = await Message.list(config)
        const { data } = response.data

        const isFirstPage = requestParams.page === 1
        if (data) {
          setMessages(prev => (isFirstPage ? data : [...data, ...prev]))
        }
      } catch (err) {
        console.error(err)
      }
    }

    getMessages(params.current)
  }, [])

  useEffect(() => {
    ws.onNewMessage((newMessage: IMessage) => {
      setMessages(prev => [...prev, newMessage])
    })
  }, [])

  return (
    <Scroll style={styles.Content}>
      {messages.map((message, idx) => {
        const isFollowingMessage =
          messages[idx - 1]?.authorId === message.authorId
        const hasFollwingMessage =
          messages[idx + 1]?.authorId === message.authorId

        return (
          <ChatMessage
            key={message.id}
            message={message}
            isFollowingMessage={isFollowingMessage}
            hasFollwingMessage={hasFollwingMessage}
          />
        )
      })}
      <Span style={styles.BottomSpacing} />
    </Scroll>
  )
}

export default ChatContent

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    height: '100%',
  },
  BottomSpacing: {
    height: 18,
  },
})
