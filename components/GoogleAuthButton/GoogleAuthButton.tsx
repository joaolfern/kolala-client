import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Button from '../Button/Button'
import Text from '../Text/Text'
import google from '../../assets/images/google.png'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

WebBrowser.maybeCompleteAuthSession()

function GoogleAuthButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  })

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response

      console.log('👾👾👾👾', authentication)
    }
  }, [response])

  return (
    <View style={styles.View}>
      <Button
        disabled={!request}
        style={styles.Button}
        onPress={() => {
          promptAsync()
        }}
      >
        <Image style={styles.Image} source={google} />
        <Text style={styles.Text}>Continuar com Google</Text>
      </Button>
    </View>
  )
}

export default GoogleAuthButton

const styles = StyleSheet.create({
  Image: {
    marginRight: 36
  },
  View: {
    padding: 19,
    width: '100%',

  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    height: 59,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  Text: {
    color: '#6C6C6C',
    fontWeight: '600',
  }
})