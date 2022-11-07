import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Span from '../../../components/Span/Span'
import TimesCircle from '../../../components/TimesCircle/TimesCircle'
import { dismissReplyTarget, useReply } from '../../../store/replySlice'
import { useAppDispatch } from '../../../store/hooks'
import { useChat } from '../useChat'
import ReplyPreview from '../../../components/ReplyPreview/ReplyPreview'
import Colors from '../../../constants/Colors'

function ChatReplyPreview() {
  const dispatch = useAppDispatch()
  const { replyTarget } = useReply()
  const { setValue } = useChat()

  function dismiss() {
    setValue('answerToId', undefined)
    dispatch(dismissReplyTarget())
  }

  return (
    <Span style={styles.Container}>
      <Span style={styles.Wrapper}>
        <ReplyPreview
          content={replyTarget?.content}
          title={replyTarget?.author.name}
        />
        <TouchableOpacity style={styles.DismissButton} onPress={dismiss}>
          <TimesCircle size={24} />
        </TouchableOpacity>
      </Span>
    </Span>
  )
}

export default ChatReplyPreview

const styles = StyleSheet.create({
  Container: {
    margin: 'auto',
    width: '100%',
    flexGrow: 1,
    position: 'absolute',
    bottom: 70,
    paddingHorizontal: 14,
    paddingTop: 6,
    backgroundColor: Colors.background,
  },
  Wrapper: {
    position: 'relative',
  },
  DismissButton: {
    position: 'absolute',
    right: 14,
    top: 7,
  },
})
