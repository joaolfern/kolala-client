import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

import Chat from '@//assets/mapIcons/chat.svg'
import Colors from '@/constants/Colors'
import type { IEventListItem } from '@/Models/Event'
import Button from '@/components/Button/Button'

interface IProps {
  event: IEventListItem
}

function EventItemChatButton({ event }: IProps) {
  const navigation = useNavigation()

  function navigateToChat(event: IEventListItem) {
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
