import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Button from '../components/Button/Button'
import Header from '../components/Header/Header'
import Label from '../components/Label/Label'
import SafeAreaView from '../components/SafeAreaView/SafeAreaView'
import Span from '../components/Span/Span'
import Text from '../components/Text/Text'
import View from '../components/View/View'
import Colors from '../constants/Colors'
import { RootTabScreenProps } from '../types'

function Events({ navigation }: RootTabScreenProps<'Events'>) {
  const onPress = () => {
    navigation.navigate('EventForm')
  }

  return (
    <SafeAreaView style={styles.View}>
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
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  View: {
    padding: 16,
  },
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
  },
  CreateButtonText: {
    color: Colors.altText,
  },
})

export default Events
