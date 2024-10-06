import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { Image, StyleSheet } from 'react-native'

import google from '@/assets/images/google.png'
import { EXPO_CLIENT_ID } from '../../../env'
import { useAppDispatch } from '@/store/hooks'
import { setToken } from '@/store/tokenSlice'
import { setUser } from '@/store/userSlice'
import { showToast } from '@/utils/toast'
import Button from '../Button/Button'
import Span from '../Span/Span'
import Text from '../Text/Text'
import { sendAccessTokenRequest } from './api'
import authButtonStyle from './authButtonStyle'

GoogleSignin.configure()

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ], // what API you want to access on behalf of the user, default is email and profile
  webClientId: EXPO_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
})

function GoogleAuthButton() {
  const dispatch = useAppDispatch()

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const authentication = await GoogleSignin.signIn()
      const accessToken = authentication?.idToken
      if (accessToken) {
        await sendAccessToken(accessToken)
        return
      }
      throw new Error('Access token not found')
    } catch (err) {
      console.log('error', err)
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (err.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  async function sendAccessToken(accessToken: string) {
    try {
      const response = await sendAccessTokenRequest({ accessToken })
      const { token, user } = response.data?.data || {}

      if (user) dispatch(setUser(user))

      if (token) dispatch(setToken(token))
    } catch (err) {
      const message = err?.response?.data
      if (message) {
        showToast(message)
      }
    }
  }

  return (
    <Span style={[authButtonStyle.View, styles.View]}>
      <Button style={[authButtonStyle.Button, styles.Button]} onPress={signIn}>
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
