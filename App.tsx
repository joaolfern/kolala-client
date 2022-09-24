import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './hooks/useCachedResources'
import * as Location from 'expo-location'
import * as Svg from 'react-native-svg'
import { Provider } from 'react-redux'
import { store } from './store/store'
import InitialWidget from './navigation/InitialWidget'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['EventEmitter.removeListener'])

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <InitialWidget />
          <StatusBar backgroundColor='transparent' style={'dark'} />
        </Provider>
      </SafeAreaProvider>
    )
  }
}
