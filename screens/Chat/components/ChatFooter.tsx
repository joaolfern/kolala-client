import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import Button from '../../../components/Button/Button'
import Span from '../../../components/Span/Span'
import TextInput from '../../../components/TextInput/TextInput'
import Colors from '../../../constants/Colors'
import socket from '../../../services/socket'
import { shadow } from '../../EventForm/utils'

interface IChatRequest {
  message: string
}

function ChatFooter() {
  const { control, handleSubmit } = useForm<IChatRequest>()

  useEffect(() => {
    function connectToChat() {
      console.log('should connect')
      socket.connect()
      socket.on('updateMessages', args => {
        console.log('🪢🪢', args)
      })
    }

    connectToChat()
  }, [])

  function sendMessage(data: IChatRequest) {
    socket.emit('sendMessage', data)
  }

  return (
    <Span style={styles.Footer}>
      <TextInput
        style={styles.TextInput}
        control={control}
        name='message'
        placeholder='Digite algo'
      />
      <Button style={styles.Button} onPress={handleSubmit(sendMessage)}>
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
