import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
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

function C() {
  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate('EventForm')
  }

  return (
    <Span style={styles.EventItems}>
      <Header>Seus eventos</Header>
      <Button onPress={onPress} style={styles.CreateButton}>
        <Text style={styles.CreateButtonText}>Criar evento</Text>
      </Button>
      <Text style={styles.Title}>Organizando</Text>
    </Span>
  )
}

function Events() {
  const [organizingEvents, setOrganizingEvents] = useState<IEvent.ListItem[]>(
    []
  )
  const [participatingEvents, setPariticipatingEvents] = useState<
    IEvent.ListItem[]
  >([])
  const [loading, setLoading] = useState(false)

  async function getEvents() {
    setLoading(true)
    try {
      const response = await listEvents()
      const { organizingEvents, participatingEvents } = response.data.data || {}
      if (participatingEvents) {
        setPariticipatingEvents(participatingEvents)
      }
      if (organizingEvents) {
        setOrganizingEvents(organizingEvents)
      }
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
          <C />
          <Span style={styles.loadingContainer}>
            <Spinner />
          </Span>
        </Span>
      ) : (
        <FlatList
          style={styles.Container}
          stickyHeaderIndices={[0]}
          StickyHeaderComponent={C}
          data={organizingEvents}
          ListEmptyComponent={<Text style={styles.NoData}>Nenhum dado</Text>}
          renderItem={({ item }) => <EventItem event={item} />}
        />
      )}
      <Text>eoo</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {},
  NoData: {
    color: Colors.gray,
    margin: 'auto',
    alignSelf: 'center',
  },
  EventItems: {
    padding: 16,
  },
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
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

export default Events
