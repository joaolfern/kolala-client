import React from 'react'
import { StyleSheet } from 'react-native'
import Scroll from '../../../components/Scroll/Scroll'
import Span from '../../../components/Span/Span'
import { useChat } from '../useChat'
import ChatMessage from './ChatMessage'

interface IProps {}

function ChatContent({}: IProps) {
  const { messages } = useChat()

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
