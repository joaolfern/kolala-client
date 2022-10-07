import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, SectionList, StyleSheet } from 'react-native'
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import EventItem from '../../components/EventItem/EventItem'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Span from '../../components/Span/Span'
import Text from '../../components/Text/Text'
import Colors from '../../constants/Colors'
import { IEvent } from '../../types/Event'
import { listEvents } from './api'
import Spinner from '../../components/Spinner/Spinner'

function EventListHeader() {
  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate('EventForm')
  }

  return (
    <Span style={styles.EventListHeader}>
      <Header>Seus eventos</Header>
      <Button onPress={onPress} style={styles.CreateButton}>
        <Text style={styles.CreateButtonText}>Criar evento</Text>
      </Button>
    </Span>
  )
}

function NoResultMessage() {
  return <Text style={styles.NoResultMessage}>Nenhum dado</Text>
}

function EventList() {
  const [eventList, setEventList] = useState<IEvent.IEventSections[]>([])
  const [loading, setLoading] = useState(false)

  async function getEvents() {
    setLoading(true)
    try {
      const response = await listEvents()
      const data = response.data?.data
      if (data) setEventList(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <SafeAreaView>
      {loading ? (
        <Span style={styles.Container}>
          <EventListHeader />
          <Span style={styles.loadingContainer}>
            <Spinner />
          </Span>
        </Span>
      ) : (
        <SectionList
          style={styles.Container}
          ListHeaderComponent={EventListHeader}
          sections={eventList}
          ListEmptyComponent={NoResultMessage}
          renderItem={({ item }) => <EventItem event={item} />}
          renderSectionHeader={({ section: { title, data } }) => (
            <Span>
              <Text style={styles.Title}>{title}</Text>
              {!data.length && <NoResultMessage />}
            </Span>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {},
  NoResultMessage: {
    color: Colors.gray,
    margin: 'auto',
    alignSelf: 'center',
    marginBottom: 20,
  },
  EventListHeader: {
    padding: 16,
    paddingBottom: 0,
  },
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
  },
  CreateButton: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
  },
  CreateButtonText: {
    color: Colors.altText,
  },
  loadingContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default EventList
