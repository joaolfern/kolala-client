import React from 'react'
import Button from '../../../Button/Button'
import Chat from '../../../../assets/mapIcons/chat.svg'
import { StyleSheet } from 'react-native'
import Colors from '../../../../constants/Colors'

function MyEventChatButton() {
  return (
    <Button style={styles.Button}>
      <Chat />
    </Button>
  )
}

export default MyEventChatButton

const styles = StyleSheet.create({
  Button: {
    backgroundColor: Colors.secondaryColor,
    flex: 0,
  },
})
