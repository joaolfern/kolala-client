import { useNavigationState } from '@react-navigation/native'
import React, { createContext, useContext } from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Colors from '../../constants/Colors'
import { IEvent } from '../../Models/Event'
import { RootStackParamList } from '../../types'
import ChatContent from './components/ChatContent'
import ChatFooter from './components/ChatFooter'
import ChatHeader from './components/ChatHeader'

type IContext = {
  event: null | IEvent.ListItem
}

const initialState: IContext = {
  event: null,
}

const ChatContext = createContext(initialState)

function Chat() {
  const { event } = useNavigationState(
    state =>
      state.routes.find(item => item.name === 'Chat')
        ?.params as RootStackParamList['Chat']
  )

  const context = {
    event,
  }

  return (
    <ChatContext.Provider value={context}>
      <SafeAreaView style={styles.Container}>
        <ChatHeader />
        <ChatContent />
        <ChatFooter />
      </SafeAreaView>
    </ChatContext.Provider>
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

export const useChatEvent = () => useContext(ChatContext)
