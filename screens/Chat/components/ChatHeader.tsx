import React from 'react'
import { StyleSheet } from 'react-native'
import Avatar from '../../../components/Avatar/Avatar'
import EllipsisButton from '../../../components/EllipsisButton/EllipsisButton'
import Header from '../../../components/Header/Header'
import Span from '../../../components/Span/Span'
import Text from '../../../components/Text/Text'
import Colors from '../../../constants/Colors'
import { IEvent } from '../../../Models/Event'

interface IChatHeader {
  event: IEvent.ListItem
}

function ChatHeader({ event }: IChatHeader) {
  return (
    <Header style={styles.Header}>
      <Avatar
        style={styles.Avatar}
        source={event?.image ? { uri: event.image } : undefined}
      />
      <Span style={styles.HeaderContent}>
        <Span style={styles.TitleGroup}>
          <Header.Title style={styles.Title}>{event?.title}</Header.Title>
          <Text style={styles.SubTitle}>
            {event.Atendee.length} participantes
          </Text>
        </Span>
        <EllipsisButton onPress={() => {}} />
      </Span>
    </Header>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    paddingBottom: 16,
    borderColor: Colors.lightBackground,
  },
  HeaderContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  TitleGroup: {
    marginLeft: 14,
  },
  Avatar: {
    width: 45,
    height: 45,
  },
  Title: {
    marginRight: 14,
    maxWidth: 200,
  },
  SubTitle: {
    fontSize: 16,
  },
})
