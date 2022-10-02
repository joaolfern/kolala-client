import React from 'react'
import Button from '../../../Button/Button'
import Chat from '../../../../assets/mapIcons/chat.svg'
import { StyleSheet } from 'react-native'
import Colors from '../../../../constants/Colors'

function EventItemChatButton() {
  return (
    <Button style={styles.Button}>
      <Chat />
    </Button>
  )
}

export default EventItemChatButton

const styles = StyleSheet.create({
  Button: {
    backgroundColor: Colors.secondaryColor,
    flex: 0,
  },
})
