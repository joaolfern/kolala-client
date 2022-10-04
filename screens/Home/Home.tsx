import React, { useEffect, useState, useId } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'
import mapStyle from '../../constants/mapStyle'
import View from '../../components/View/View'
import { getMarkers, IMarkers } from './api'
import { MAP_ICONS } from '../EventForm/constants'
import useUserLocation from './UserMarker/useUserLocation'

export default function Home() {
  const [markers, setMarkers] = useState<IMarkers[]>([])
  const { userLocation } = useUserLocation()

  async function requestMarkers(location: Region) {
    const response = await getMarkers({
      params: {
        lat: location.latitude,
        lng: location.longitude,
      },
    })
    const data = response.data.data

    if (Array.isArray(data)) setMarkers(data)
  }

  useEffect(() => {
    if (userLocation) requestMarkers(userLocation)
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        minZoomLevel={11}
        style={styles.map}
        customMapStyle={mapStyle}
        region={userLocation}
        showsUserLocation={true}
      >
        {markers.map((marker, idx) => {
          return (
            <Marker
              key={marker.lat + marker.lng + idx}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng,
              }}
              image={MAP_ICONS[marker.icon || 0]}
            />
          )
        })}
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
    height: Dimensions.get('window').height + 100,
  },
})
