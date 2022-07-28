import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Text from '../components/Text/Text'
import View from '../components/View/View'
import logo from '../assets/images/logo.png'
import Colors from '../constants/Colors'
import GoogleAuthButton from '../components/GoogleAuthButton/GoogleAuthButton'

function Login() {
  return (
    <View
      style={style.View}
    >
      <Image
        style={style.Logo}
        source={logo}
      />
      <Text style={style.Title}>kolala</Text>
      <Text style={style.Description}>seu minimapa da vida real</Text>
      <GoogleAuthButton />
    </View>
  )
}

const style = StyleSheet.create({
  View: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingBottom: '20%',
  },
  Title: {
    color: Colors.secondaryColor,
    fontWeight: '600',
    fontSize: 30
  },
  Description: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  Logo: {
    marginBottom: 10
  }
})

export default Login
