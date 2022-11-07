import React, { ReactNode } from 'react'
import { IMessage } from '../../../Models/Message'
import Span from '../../../components/Span/Span'
import { StyleSheet } from 'react-native'
import ReplyPreview from '../../../components/ReplyPreview/ReplyPreview'

interface IProps {
  message: IMessage
  children: ReactNode
}

function ChatAnswerToWrapper({ children, message }: IProps) {
  if (message.answerToId)
    return (
      <Span style={styles.Container}>
        <ReplyPreview
          style={styles.ReplyPreview}
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
})
