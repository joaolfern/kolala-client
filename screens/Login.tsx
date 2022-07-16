import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '../components/Text/Text'
import { View } from '../components/View/View'

function Login() {
  console.log('aa')
  return (
    <View
      style={style.view}
    >
      <Text>Kolala</Text>
      <Text>Seu minimapa da vida real</Text>
    </View>
  )
}

const style = StyleSheet.create({
  view: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})

export default Login
