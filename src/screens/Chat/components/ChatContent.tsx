import type { ScrollViewProps } from 'react-native'
import { FlatList, StyleSheet } from 'react-native'

import { useChat } from '@/screens/Chat/hooks/useChat'

import ChatMessage from './ChatMessage'

type IProps = ScrollViewProps

function ChatContent({ ...rest }: IProps) {
  const { messages } = useChat()

  return (
    <FlatList
      {...rest}
      inverted
      style={styles.Content}
      data={messages}
      renderItem={({ item, index }) => {
        const isFollowingMessage =
          messages[index + 1]?.authorId === item.authorId
        const hasFollwingMessage =
          messages[index - 1]?.authorId === item.authorId

        return (
          <ChatMessage
            key={item.id}
            message={item}
            isFollowingMessage={isFollowingMessage}
            hasFollwingMessage={hasFollwingMessage}
          />
        )
      }}
    />
  )
}

export default ChatContent

const styles = StyleSheet.create({
  Content: {
    paddingHorizontal: 16,
    flex: 1,
    height: '100%',
  },
  BottomSpacing: {
    height: 18,
  },
})
