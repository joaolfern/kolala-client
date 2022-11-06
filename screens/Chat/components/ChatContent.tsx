import React, { forwardRef, Ref } from 'react'
import { FlatList, ScrollView, ScrollViewProps, StyleSheet } from 'react-native'
import Span from '../../../components/Span/Span'
import { useChat } from '../useChat'
import ChatMessage from './ChatMessage'

type IProps = ScrollViewProps & {}

function ChatContent({ ...rest }: IProps, ref: Ref<FlatList> | null) {
  const { messages } = useChat()

  return (
    <FlatList
      {...rest}
      ref={ref}
      inverted={true}
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

export default forwardRef(ChatContent)

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
