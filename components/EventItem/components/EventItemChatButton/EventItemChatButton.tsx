import React from 'react'
import Button from '../../../Button/Button'
import Chat from '../../../../assets/mapIcons/chat.svg'
import { StyleSheet } from 'react-native'
import Colors from '../../../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { IEvent } from '../../../../Models/Event'
import Span from '../../../Span/Span'

interface IProps {
  event: IEvent.ListItem
}

function EventItemChatButton({ event }: IProps) {
  const navigation = useNavigation()

  function navigateToChat(event: IEvent.ListItem) {
    navigation.navigate('Chat', {
      event,
    })
  }

  return (
    <Button onPress={() => navigateToChat(event)} style={styles.Button}>
      <Chat />
    </Button>
  )
}

export default EventItemChatButton

EventItemChatButton.Skeleton = Skeleton

function Skeleton() {
  return <Button style={styles.Button} />
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: Colors.secondaryColor,
    flex: 0,
  },
  Skeleton: {
    backgroundColor: Colors.gray,
  },
})
