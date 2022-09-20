import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import * as Location from 'expo-location'
import * as Svg from 'react-native-svg'
import EventForm from './screens/EventForm/EventForm'
import Login from './screens/Login'
import { Provider } from 'react-redux'
import { store } from './store/tokenStore'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          {0 ? <Navigation /> : <Login />}
          <StatusBar backgroundColor='transparent' style={'dark'} />
        </Provider>
      </SafeAreaProvider>
    )
  }
}
