import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { SectionList, StyleSheet } from 'react-native'
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import EventItem from '../../components/EventItem/EventItem'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Span from '../../components/Span/Span'
import Text from '../../components/Text/Text'
import Colors from '../../constants/Colors'
import Spinner from '../../components/Spinner/Spinner'
import Event, { IEvent } from '../../Models/Event'
import EventListSectionTitle from './components/EventListSectionTitle/EventListSectionTitle'
import NoResultMessage from './components/NoResultMessage/NoResultMessage'

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

export type _eventListTypes = 'organizing' | 'participating'

type IEventList = {
  [key in _eventListTypes]: {
    data: IEvent.IEventSections | null
    arePast: boolean
    loading: boolean
  } | null
}

function EventList() {
  const [initialLoading, setInitialLoading] = useState(false)
  const [events, setEvents] = useState<IEventList>({
    organizing: {
      arePast: false,
      data: null,
      loading: false,
    },
    participating: {
      arePast: false,
      data: null,
      loading: false,
    },
  })

  async function getEvents(type: _eventListTypes, arePast: boolean = true) {
    setEvents(
      prev =>
        ({
          ...prev,
          [type]: {
            ...prev[type],
            loading: true,
          },
        } as IEventList)
    )
    try {
      const config = {
        params: {
          arePast,
        },
      }
      const response = await Event.listEvents(type, config)
      const data = response.data?.data
      if (data) {
        setEvents(prev => {
          return {
            ...prev,
            [type]: {
              ...prev[type],
              data,
              arePast,
            } as IEventList['organizing'],
          }
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setEvents(
        prev =>
          ({
            ...prev,
            [type]: {
              ...prev[type],
              loading: false,
            },
          } as IEventList)
      )
    }
  }

  async function getInitalEvents() {
    setInitialLoading(true)
    await getEvents('organizing', events.organizing?.arePast)
    await getEvents('participating', events.participating?.arePast)
    setInitialLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      getInitalEvents()
    }, [])
  )

  const list = [
    ...(events?.organizing?.data ? [events?.organizing?.data] : []),
    ...(events?.participating?.data ? [events?.participating?.data] : []),
  ]

  const loadingElement = (
    <Span style={styles.Container}>
      <EventListHeader />
      <Span style={styles.loadingContainer}>
        <Spinner />
      </Span>
    </Span>
  )

  return (
    <SafeAreaView>
      {initialLoading ? (
        loadingElement
      ) : (
        <SectionList
          style={styles.Container}
          ListHeaderComponent={EventListHeader}
          sections={list}
          ListEmptyComponent={NoResultMessage}
          renderItem={({ item, index, section }) =>
            index === 0 && events[item.title as _eventListTypes]?.loading ? (
              loadingElement
            ) : (
              <EventItem event={item} />
            )
          }
          renderSectionHeader={({ section }) => {
            const eventType = section.title as _eventListTypes

            return (
              <EventListSectionTitle
                section={section}
                showPastEvents={!!events[eventType]?.arePast}
                toggleShowPastEvents={() => {
                  return setEvents(prev => {
                    const updatedArePast = !prev[eventType]?.arePast

                    getEvents(eventType, updatedArePast)
                    return {
                      ...prev,
                      [eventType]: {
                        ...prev[eventType],
                        arePast: updatedArePast,
                      },
                    }
                  })
                }}
              />
            )
          }}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {},
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
