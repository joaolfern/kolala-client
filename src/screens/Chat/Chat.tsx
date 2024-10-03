import { StyleSheet } from 'react-native'

import { ChatProvider } from '@/screens/Chat/providers/ChatProvider'

import SafeAreaView from '@/components/SafeAreaView/SafeAreaView'
import Colors from '@/constants/Colors'
import ChatContent from './components/ChatContent'
import ChatFooter from './components/ChatFooter'
import ChatHeader from './components/ChatHeader'

function Chat() {
  return (
    <ChatProvider>
      <SafeAreaView style={styles.Container}>
        <ChatHeader />
        <ChatContent />
        <ChatFooter />
      </SafeAreaView>
    </ChatProvider>
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
