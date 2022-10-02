import dayjs from 'dayjs'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { IEvent } from '../../types/Event'
import Avatar from '../Avatar/Avatar'
import CategoryTag from '../CategoryTag/CategoryTag'
import Span from '../Span/Span'
import Text from '../Text/Text'
import EventItemChatButton from './components/EventItemChatButton/EventItemChatButton'
import { IEventRegistry } from './types'

interface IProps {
  event: IEvent.ListItem
}

function EventItem({ event }: IProps) {
  return (
    <Span style={[styles.Container, styles.GapBottom]}>
      <Span style={[styles.Header, styles.innerGapBottom]}>
        <Avatar
          style={styles.Image}
          source={event.image ? { uri: event.image } : undefined}
        />
        <Span style={styles.HeaderTitle}>
          <Text style={styles.HeaderTitleText}>{event.title}</Text>
          <CategoryTag key={event.category} category={event.category} />
        </Span>
      </Span>
      <Span style={[styles.DataRow, styles.innerGapBottom]}>
        <Span style={styles.DataRowLeft}>
          <Text>Data</Text>
          <Text>{dayjs(event.datetime).format('D/M')}</Text>
        </Span>
        <Span style={styles.DataRowRight}>
          <Text>Horário</Text>
          <Text>{dayjs(event.datetime).format('DD [de] MMM[.]')}</Text>
        </Span>
      </Span>
      <Span style={styles.DataRow}>
        <Span style={styles.DataRowRight}>
          <Text>Participantes</Text>
          <Text>{event.memberCount}</Text>
        </Span>
        <EventItemChatButton />
      </Span>
    </Span>
  )
}

export default EventItem

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.xLightBackground,
    borderRadius: 13,
    padding: 20,
    elevation: 5, // Android
    shadowColor: '#030002', // Android, iOS & Web
    shadowOpacity: 0.25, // iOS & Web
    shadowRadius: 5,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 99999,
    marginRight: 16,
  },
  HeaderTitle: {
    alignItems: 'flex-start',
  },
  HeaderTitleText: {
    marginBottom: 5,
  },
  DataRow: {
    flexDirection: 'row',
  },
  DataRowLeft: {
    flexGrow: 1,
  },
  DataRowRight: {
    flexGrow: 1,
  },
  GapBottom: {
    marginBottom: 16,
  },
  innerGapBottom: {
    marginBottom: 8,
  },
})
