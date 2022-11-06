import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import Button from '../../../components/Button/Button'
import Span from '../../../components/Span/Span'
import TextInput from '../../../components/TextInput/TextInput'
import Colors from '../../../constants/Colors'
import { shadow } from '../../EventForm/utils'
import { useChat } from '../useChat'

interface IChatEvent {
  content: string
}

function ChatFooter() {
  const { control, setValue, handleSubmit } = useForm<IChatEvent>()
  const { sendMessage } = useChat()

  function onPress(args: IChatEvent) {
    setValue('content', '')

    sendMessage(args)
  }

  return (
    <Span style={styles.Footer}>
      <TextInput
        style={styles.TextInput}
        control={control}
        name='content'
        placeholder='Digite algo'
      />
      <Button style={styles.Button} onPress={handleSubmit(onPress)}>
        <MaterialIcons size={29} name='send' />
      </Button>
    </Span>
  )
}

export default ChatFooter

const styles = StyleSheet.create({
  Footer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 8,
  },
  TextInput: {
    flex: 1,
    marginBottom: 0,
    borderRadius: 22,
    borderWidth: 0,
    backgroundColor: Colors.xLightBackground,
    marginRight: 16,
    ...shadow,
  },
  Button: {
    height: 58,
    width: 58,
    borderRadius: 22,
    ...shadow,
  },
})
