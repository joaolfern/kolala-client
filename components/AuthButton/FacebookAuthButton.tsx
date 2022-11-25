import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Button from '../Button/Button'
import Text from '../Text/Text'
import facebook from '../../assets/images/facebook.png'
import * as WebBrowser from 'expo-web-browser'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { sendAccessTokenRequest } from './api'
import authButtonStyle from './authButtonStyle'
import Span from '../Span/Span'
import { EXPO_FB_CLIENT_ID } from '../../env'
WebBrowser.maybeCompleteAuthSession()

function FacebookAuthButton() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    expoClientId: EXPO_FB_CLIENT_ID,
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  })

  React.useEffect(() => {
    async function sendAccessToken(accessToken: string) {
      try {
        const response = await sendAccessTokenRequest({ accessToken })
      } catch (err) {}
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
        <Image
          style={[authButtonStyle.Image, styles.Image]}
          source={facebook}
        />
        <Text style={[authButtonStyle.Text, styles.Text]}>
          Continuar com Facebook
        </Text>
      </Button>
    </Span>
  )
}

export default FacebookAuthButton

const styles = StyleSheet.create({
  Image: {},
  View: {
    paddingVertical: 0,
  },
  Button: {
    backgroundColor: '#1877F2',
  },
  Text: {
    color: '#ffffff',
  },
})
