import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import EventItem from '../../components/EventItem/EventItem'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Span from '../../components/Span/Span'
import Text from '../../components/Text/Text'
import Colors from '../../constants/Colors'
import { RootTabScreenProps } from '../../types'
import { IEvent } from '../../types/Event'
import { listEvents } from './api'

function Events({ navigation }: RootTabScreenProps<'Events'>) {
  const [organizingEvents, setOrganizingEvents] = useState<IEvent.ListItem[]>(
    []
  )
  const [participatingEvents, setPariticipatingEvents] = useState<
    IEvent.ListItem[]
  >([])

  async function getEvents() {
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
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  const onPress = () => {
    navigation.navigate('EventForm')
  }

  console.log('🙌🙌🙌🙌', organizingEvents)

  return (
    <SafeAreaView>
      <ScrollView style={styles.Container}>
        <Span style={styles.EventItems}>
          <Header>Seus eventos</Header>
          <Button style={styles.CreateButton}>
            <Text onPress={onPress} style={styles.CreateButtonText}>
              Criar evento
            </Text>
          </Button>
          <Text style={styles.Title}>Organizando</Text>
          <FlatList
            data={organizingEvents}
            scrollEnabled={false}
            ListEmptyComponent={<Text style={styles.NoData}>Nenhum dado</Text>}
            renderItem={({ item }) => <EventItem event={item} />}
          />
        </Span>
        {!!participatingEvents.length && (
          <>
            <Text style={styles.Title}>Participando</Text>
            <FlatList
              data={participatingEvents}
              scrollEnabled={false}
              renderItem={({ item }) => <EventItem event={item} />}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    padding: 16,
  },
  NoData: {
    color: Colors.gray,
    margin: 'auto',
    alignSelf: 'center',
  },
  EventItems: {
    marginBottom: 18,
  },
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 19,
  },
  CreateButton: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
  },
  CreateButtonText: {
    color: Colors.altText,
  },
})

export default Events
