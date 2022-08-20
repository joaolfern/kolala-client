import dayjs from 'dayjs'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import CategoryTag from '../CategoryTag/CategoryTag'
import Span from '../Span/Span'
import Text from '../Text/Text'
import MyEventChatButton from './components/MyEventChatButton/MyEventChatButton'
import { IEvent } from './types'

interface IProps {
  event: IEvent
}

function MyEvent({ event }: IProps) {
  return (
    <Span style={[styles.Container, styles.GapBottom]}>
      <Span style={[styles.Header, styles.innerGapBottom]}>
        <Image style={styles.Image} source={{ uri: event.img }} />
        <Span style={styles.HeaderTitle}>
          <Text style={styles.HeaderTitleText}>{event.title}</Text>
          {event.categories.map(category => (
            <CategoryTag key={category.value} category={category} />
          ))}
        </Span>
      </Span>
      <Span style={[styles.DataRow, styles.innerGapBottom]}>
        <Span style={styles.DataRowLeft}>
          <Text>Data</Text>
          <Text>{dayjs(event.date).format('D/M')}</Text>
        </Span>
        <Span style={styles.DataRowRight}>
          <Text>Horário</Text>
          <Text>{dayjs(event.time).format('DD [de] MMM[.]')}</Text>
        </Span>
      </Span>
      <Span style={styles.DataRow}>
        <Span style={styles.DataRowRight}>
          <Text>Participantes</Text>
          <Text>{event.members.length || 0}</Text>
        </Span>
        <MyEventChatButton />
      </Span>
    </Span>
  )
}

export default MyEvent

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
