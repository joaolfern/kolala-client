import React, { ReactNode } from 'react'
import { IMessage } from '../../../Models/Message'
import Span from '../../../components/Span/Span'
import { StyleSheet } from 'react-native'
import ReplyPreview from '../../../components/ReplyPreview/ReplyPreview'
import Colors from '../../../constants/Colors'

interface IProps {
  message: IMessage
  children: ReactNode
  isAuthor: boolean
}

function ChatAnswerToWrapper({ children, message, isAuthor }: IProps) {
  if (message.answerToId)
    return (
      <Span style={styles.Container}>
        <ReplyPreview
          style={[
            styles.ReplyPreview,
            ...(isAuthor ? [] : [styles.ReplyPreviewNotAuthor]),
          ]}
          title={message.answerTo?.author?.name}
          content={message.answerTo?.content}
        />
        {children}
      </Span>
    )

  return <>{children}</>
}

export default ChatAnswerToWrapper

const styles = StyleSheet.create({
  Container: {},
  ReplyPreview: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 7,
  },
  ReplyPreviewNotAuthor: {
    backgroundColor: Colors.chatTextbox,
  },
})
