import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import Label from '../../components/Label/Label'
import MyEvent from '../../components/MyEvent/MyEvent'
import { IEvent } from '../../components/MyEvent/types'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Span from '../../components/Span/Span'
import Text from '../../components/Text/Text'
import View from '../../components/View/View'
import Colors from '../../constants/Colors'
import { RootTabScreenProps } from '../../types'

const myEvents: IEvent[] = [
  {
    categories: [
      {
        label: 'Geek',
        value: 'Geek',
      },
    ],
    date: '01-01-2023',
    time: '10:00',
    img: 'https://picsum.photos/200',
    title: 'RPG e Café',
    members: ['1', '2'],
  },
  {
    categories: [
      {
        label: 'Geek',
        value: 'Geek',
      },
    ],
    date: '01-01-2023',
    time: '10:00',
    img: 'https://picsum.photos/200',
    title: 'RPG e Café',
    members: ['1', '2'],
  },
  {
    categories: [
      {
        label: 'Geek',
        value: 'Geek',
      },
    ],
    date: '01-01-2023',
    time: '10:00',
    img: 'https://picsum.photos/200',
    title: 'RPG e Café',
    members: ['1', '2'],
  },
]

function Events({ navigation }: RootTabScreenProps<'Events'>) {
  const onPress = () => {
    navigation.navigate('EventForm')
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Span style={styles.MyEvents}>
          <Header>Seus eventos</Header>
          <Button style={styles.CreateButton}>
            <Text onPress={onPress} style={styles.CreateButtonText}>
              Criar evento
            </Text>
          </Button>
        </Span>
        <Text style={styles.Title}>Eventos que você participa</Text>
        <FlatList
          data={myEvents}
          scrollEnabled={false}
          renderItem={({ item }) => <MyEvent event={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  MyEvents: {
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
