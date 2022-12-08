import React, { useRef } from 'react'
import { Image, StyleSheet } from 'react-native'
import Button from '../Button/Button'
import Text from '../Text/Text'
import google from '../../assets/images/google.png'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { sendAccessTokenRequest } from './api'
import authButtonStyle from './authButtonStyle'
import { setToken } from '../../store/tokenSlice'
import { setUser } from '../../store/userSlice'
import { useAppDispatch } from '../../store/hooks'
import Span from '../Span/Span'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '../../env'
import { showToast } from '../../utils/toast'
WebBrowser.maybeCompleteAuthSession()

function GoogleAuthButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  })

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    async function sendAccessToken(accessToken: string) {
      try {
        const response = await sendAccessTokenRequest({ accessToken })
        const { token, user } = response.data?.data || {}

        if (user) dispatch(setUser(user))

        if (token) dispatch(setToken(token))
      } catch (err: any) {
        const message = err?.response?.data
        if (message) {
          showToast(message)
        }
      }
    }

    if (response?.type === 'success') {
      const { authentication } = response
      if (authentication?.accessToken)
        sendAccessToken(authentication?.accessToken)
    }
  }, [response])

  return (
    <Span style={[authButtonStyle.View, styles.View]}>
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
    </Span>
  )
}

export default GoogleAuthButton

const styles = StyleSheet.create({
  Image: {},
  View: {
    margin: 0,
    height: 'auto',
    paddingVertical: 0,
  },
  Button: {
    backgroundColor: '#fff',
  },
  Text: {
    color: '#6C6C6C',
  },
})
