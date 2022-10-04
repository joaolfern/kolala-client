import React, { useEffect, useState } from 'react'
import { Region } from 'react-native-maps'
import * as Location from 'expo-location'
import { ENVIRONMENT, GOOGLE_API_TOKEN } from '@env'

function useUserLocation() {
  const [userLocation, setPosition] = useState<Region>()

  async function getUserLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      console.log(`Location access denied`)
    }

    let devicePosition
    console.log('🐨 env', ENVIRONMENT)
    if (ENVIRONMENT === `local`) {
      devicePosition = {
        latitude: -23.4874549,
        longitude: -47.4991724,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    } else {
      Location.setGoogleApiKey(GOOGLE_API_TOKEN)

      let { coords } = await Location.getCurrentPositionAsync()
      devicePosition = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }

    setPosition(devicePosition)
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return {
    userLocation,
    updatedUserLocation: getUserLocation,
  }
}

export default useUserLocation
