import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import * as Location from 'expo-location'
import * as Svg from 'react-native-svg';
import Login from './screens/Login'
import EventForm from './screens/EventForm/EventForm'

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        {0 ? <Navigation  /> : <EventForm />}
        <StatusBar style={'light'} />
      </SafeAreaProvider>
    )
  }
}
