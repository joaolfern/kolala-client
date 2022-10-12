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
import Toast from './components/Toast/Toast'
import { toastRef } from './utils/toast'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

LogBox.ignoreLogs(['EventEmitter.removeListener'])

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <ActionSheetProvider>
            <InitialWidget />
          </ActionSheetProvider>
          <Toast {...{ ref: toastRef }} />
          <StatusBar backgroundColor='transparent' style={'dark'} />
        </Provider>
      </SafeAreaProvider>
    )
  }
}
