import React, { useEffect, useState } from 'react'
import { Region } from 'react-native-maps'
import * as Location from 'expo-location'
import { ENVIRONMENT, GOOGLE_API_TOKEN } from '@env'
import * as SecureStore from 'expo-secure-store'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  clearLocation,
  selectUser,
  setLocation,
} from '../../../store/userSlice'
const MOCKED_LOCATION = {
  latitude: -23.4874549,
  longitude: -47.4991724,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

function useUserLocation() {
  const { location, user } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  async function updateUserLocation() {
    dispatch(clearLocation())
    getUserLocation()
  }

  async function tryCachedLocation() {
    try {
      const cachedLocation = await SecureStore.getItemAsync('location')
      if (cachedLocation) {
        const parsedLocation = JSON.parse(cachedLocation) as Region
        return parsedLocation
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function getApiLocation() {
    Location.setGoogleApiKey(GOOGLE_API_TOKEN)

    let { coords } = await Location.getCurrentPositionAsync()
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  async function getUserLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      console.log(`Location access denied`)
    }

    // const cachedLocation = await tryCachedLocation()

    // if (cachedLocation) {
    //   return cachedLocation
    // }

    console.log('🐨 env', ENVIRONMENT)
    const userLocation =
      ENVIRONMENT === `local` ? MOCKED_LOCATION : await getApiLocation()

    if (userLocation) {
      return userLocation
    }
  }

  async function getGlobalLocaiton() {
    const location = await getUserLocation()

    if (location) dispatch(setLocation(location))
  }

  useEffect(() => {
    getGlobalLocaiton()
  }, [])

  return {
    location,
    updateUserLocation,
  }
}

export default useUserLocation
