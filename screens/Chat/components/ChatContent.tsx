import React from 'react'
import { StyleSheet } from 'react-native'
import Scroll from '../../../components/Scroll/Scroll'

function ChatContent() {
  return <Scroll style={styles.Content}></Scroll>
}

export default ChatContent

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    height: '100%',
  },
})
