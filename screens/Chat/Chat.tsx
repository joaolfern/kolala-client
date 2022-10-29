import { useNavigationState } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Colors from '../../constants/Colors'
import { RootStackParamList } from '../../types'
import ChatContent from './components/ChatContent'
import ChatFooter from './components/ChatFooter'
import ChatHeader from './components/ChatHeader'

function Chat() {
  const { event } = useNavigationState(
    state =>
      state.routes.find(item => item.name === 'Chat')
        ?.params as RootStackParamList['Chat']
  )

  return (
    <SafeAreaView style={styles.Container}>
      <ChatHeader event={event} />
      <ChatContent />
      <ChatFooter />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 16,
    backgroundColor: Colors.background,
    height: '100%',
  },
})

export default Chat
