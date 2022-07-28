import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { RootTabScreenProps } from '../types';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
// @ts-ignore
import coffee from '../assets/mapIcons/coffee.png'
import mapStyle from '../constants/mapStyle'

// @ts-ignore
import { ENVIRONMENT } from "@env"
import View  from '../components/View/View'

interface IMarkers {
  latitude: number
  longitude: number
  icon: 'music' | 'drink'
}

export default function Home({ navigation }: RootTabScreenProps<'Maps'>) {
  const [position, setPosition] = useState<Region>()
  const [markers, setMarkers] = useState<IMarkers[]>([])

  useEffect(() => {
    getLocation()
    getMarkers()
  }, [])

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log(`Location access denied`)
    }

    let devicePosition
    console.log('🦞', ENVIRONMENT)
    if (ENVIRONMENT === `local`) {
      devicePosition = {
        latitude: -23.4874549,
        longitude: -47.4991724,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    } else {
      const apiKey = 'AIzaSyCSnjOzWsb5WuBpLz4gUt7hLpgl0LqueKk'
      Location.setGoogleApiKey(apiKey);

      let { coords } = await Location.getCurrentPositionAsync();
      devicePosition = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

    }

    setPosition(devicePosition)
  }

  async function getMarkers() {
    setMarkers([
      {
        latitude: -23.4874549,
        longitude: -47.4991724,
        icon: 'music'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <MapView
        minZoomLevel={11}
        style={styles.map}
        customMapStyle={mapStyle}
        region={position}
      >
        {markers.map(marker => (
          <Marker
            key={123123}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            image={coffee}
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
