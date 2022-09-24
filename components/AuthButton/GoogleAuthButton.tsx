import React from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import Button from '../Button/Button'
import Text from '../Text/Text'
import google from '../../assets/images/google.png'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
// @ts-ignore
import { EXPO_CLIENT_ID } from '@env'
import { sendAccessTokenRequest } from './api'
import authButtonStyle from './authButtonStyle'
import { setToken } from '../../store/tokenSlice'
import { setUser } from '../../store/userSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
WebBrowser.maybeCompleteAuthSession()

function GoogleAuthButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  })

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    async function sendAccessToken(accessToken: string) {
      try {
        const response = await sendAccessTokenRequest({ accessToken })
        const { profile, token, user } = response.data?.data || {}

        if (profile && user) dispatch(setUser({ account: user, profile }))

        if (token) dispatch(setToken(token))
      } catch (err: any) {
        console.log(err.message)
      }
    }

    if (response?.type === 'success') {
      const { authentication } = response
      if (authentication?.accessToken)
        sendAccessToken(authentication?.accessToken)
    }
  }, [response])

  return (
    <View style={[authButtonStyle.View, styles.View]}>
      <Button
        disabled={!request}
        style={[authButtonStyle.Button, styles.Button]}
        onPress={() => {
          promptAsync()
        }}
      >
        <Image style={[authButtonStyle.Image, styles.Image]} source={google} />
        <Text style={[authButtonStyle.Text, styles.Text]}>
          Continuar com Google
        </Text>
      </Button>
    </View>
  )
}

export default GoogleAuthButton

const styles = StyleSheet.create({
  Image: {},
  View: {},
  Button: {
    backgroundColor: '#fff',
  },
  Text: {
    color: '#6C6C6C',
  },
})
