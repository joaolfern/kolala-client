import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'

import Button from '@/components/Button/Button'
import Span from '@/components/Span/Span'
import TextInput from '@/components/TextInput/TextInput'
import Colors from '@/constants/Colors'
import { useAppDispatch } from '@/store/hooks'
import { dismissReplyTarget, useReply } from '@/store/replySlice'
import { shadow } from '../../EventForm/utils'
import ChatReplyPreview from './ChatReplyPreview'
import { useChat } from '@/screens/Chat/hooks/useChat'

interface IChatEvent {
  content: string
}

function ChatFooter() {
  const dispatch = useAppDispatch()
  const { sendMessage, control, handleSubmit, inputRef } = useChat()
  const { replyTarget } = useReply()

  function onPress(args: IChatEvent) {
    dispatch(dismissReplyTarget())
    sendMessage(args)
  }

  return (
    <Span style={styles.Footer}>
      {replyTarget && <ChatReplyPreview />}
      <Span style={styles.Form}>
        <TextInput
          inputRef={inputRef}
          style={styles.TextInput}
          control={control}
          name='content'
          placeholder='Digite algo'
        />
        <Button style={styles.Button} onPress={handleSubmit(onPress)}>
          <MaterialIcons size={29} name='send' />
        </Button>
      </Span>
    </Span>
  )
}

export default ChatFooter

const styles = StyleSheet.create({
  Footer: {
    paddingTop: 8,
  },
  Form: {
    paddingTop: 8,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  TextInput: {
    flex: 1,
    marginBottom: 0,
    borderRadius: 22,
    borderWidth: 0,
    backgroundColor: Colors.xLightBackground,
    marginRight: 14,
    ...shadow,
  },
  Button: {
    height: 58,
    width: 58,
    borderRadius: 22,
    ...shadow,
  },
})
