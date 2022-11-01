import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet } from 'react-native'
import Avatar from '../../../components/Avatar/Avatar'
import Span from '../../../components/Span/Span'
import Text from '../../../components/Text/Text'
import Colors from '../../../constants/Colors'
import { IMessage } from '../../../Models/Message'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../store/userSlice'

interface IProps {
  message: IMessage
  isFollowingMessage: boolean
  hasFollwingMessage: boolean
}

function ChatMessage({
  message,
  isFollowingMessage,
  hasFollwingMessage,
}: IProps) {
  const { user } = useAppSelector(selectUser)

  const isFirstMessage = !isFollowingMessage
  const isFromUser = message.authorId === user?.id

  return (
    <Span
      style={[
        styles.Message,
        ...(isFromUser ? [styles.AlignedRight, styles.UserMessage] : []),
      ]}
    >
      <Span
        style={[
          styles.AvatarWrapper,
          ...(isFromUser ? [styles.UserAvatar] : []),
        ]}
      >
        {isFirstMessage && (
          <Avatar
            style={[styles.Avatar]}
            source={
              message.author.picture
                ? { uri: message.author.picture }
                : undefined
            }
          />
        )}
      </Span>
      <Span
        style={[
          styles.ContentWrapper,
          ...(isFromUser ? [styles.UserContentWrapper] : []),
        ]}
      >
        {isFirstMessage && (
          <Text style={styles.Name}>{message.author.name}</Text>
        )}
        <MessageContent
          message={message}
          isFollowingMessage={isFollowingMessage}
          hasFollwingMessage={hasFollwingMessage}
          isFromUser={isFromUser}
        />
      </Span>
    </Span>
  )
}

export default ChatMessage

interface IMessageContent {
  message: IMessage
  isFollowingMessage: boolean
  hasFollwingMessage: boolean
  isFromUser: boolean
}

function MessageContent({
  message,
  isFollowingMessage,
  hasFollwingMessage,
  isFromUser,
}: IMessageContent) {
  return (
    <Span
      style={[
        styles.Content,
        ...(hasFollwingMessage ? [styles.HasFollowingMessage] : []),
        ...(isFromUser ? [styles.UserContent] : []),
      ]}
    >
      <Text style={styles.Datetime}>
        {dayjs(message.createdAt).format('HH:mm')}
      </Text>
      <Text style={styles.Text}>{message.content}</Text>
    </Span>
  )
}

const styles = StyleSheet.create({
  Message: {
    flexDirection: 'row',
  },
  UserMessage: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  AvatarWrapper: {
    width: 51,
    height: 51,
    marginRight: 14,
  },
  Avatar: {},
  UserAvatar: {
    marginLeft: 14,
    marginRight: 0,
  },
  HasFollowingMessage: {
    marginBottom: 8,
  },
  AlignedRight: {
    alignSelf: 'flex-end',
  },
  Name: {
    marginBottom: 6,
  },
  ContentWrapper: {},
  UserContentWrapper: {
    alignItems: 'flex-end',
  },
  Content: {
    backgroundColor: Colors.xLightBackground,
    marginBottom: 16,
    borderRadius: 15,
    borderTopLeftRadius: 7,
    padding: 14,
    paddingTop: 10,
    overflow: 'hidden',
    maxWidth: 250,
    paddingBottom: 24,
    position: 'relative',
  },
  UserContent: {
    backgroundColor: Colors.chatTextbox,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 7,
  },
  Text: {
    fontSize: 18,
  },
  Datetime: {
    position: 'absolute',
    fontSize: 12,
    color: Colors.gray,
    right: 12,
    bottom: 4,
  },
})
