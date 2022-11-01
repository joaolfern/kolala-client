import React from 'react'
import { StyleSheet } from 'react-native'
import Scroll from '../../../components/Scroll/Scroll'
import Span from '../../../components/Span/Span'
import { IEvent } from '../../../Models/Event'
import { IMessage } from '../../../Models/Message'
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

interface IProps {
  messages?: IMessage[]
  event: IEvent.ListItem
}

function ChatContent({ event, messages = MESSAGE_MOCK }: IProps) {
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
