import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Span from '../../../components/Span/Span'
import Text from '../../../components/Text/Text'
import TimesCircle from '../../../components/TimesCircle/TimesCircle'
import Colors from '../../../constants/Colors'
import { dismissReplyTarget, useReply } from '../../../store/replySlice'
import { useAppDispatch } from '../../../store/hooks'

interface IProps {}

function ChatReplyPreview() {
  const dispatch = useAppDispatch()
  const { replyTarget } = useReply()

  return (
    <Span style={styles.Container}>
      <Span style={styles.Content}>
        <Span style={styles.Marker} />
        <Text>{replyTarget?.author.name}</Text>
        <Text style={styles.Text}>{replyTarget?.content}</Text>
        <TouchableOpacity
          style={styles.DismissButton}
          onPress={() => dispatch(dismissReplyTarget())}
        >
          <TimesCircle size={24} />
        </TouchableOpacity>
      </Span>
    </Span>
  )
}

export default ChatReplyPreview

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.background,
    margin: 'auto',
    width: '100%',
    flexGrow: 1,
    position: 'absolute',
    bottom: 70,
    paddingHorizontal: 14,
    paddingTop: 6,
  },
  Content: {
    borderRadius: 6,
    overflow: 'hidden',

    backgroundColor: Colors.xLightBackground,
    padding: 14,
  },
  Text: {
    fontSize: 14,
  },
  Marker: {
    width: 4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.secondaryColor,
  },
  DismissButton: {
    position: 'absolute',
    right: 14,
    top: 7,
  },
})
