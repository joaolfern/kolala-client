import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Region } from 'react-native-maps'
import mapStyle from '../../constants/mapStyle'
import View from '../../components/View/View'
import { getMarkers, IMarkers } from './api'
import useUserLocation from './UserMarker/useUserLocation'
import CustomMarker from '../../components/CustomMarker/CustomMarker'

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
  }, [userLocation])

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
            <CustomMarker key={marker.lat + marker.lng + idx} marker={marker} />
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
    marginBottom: 'auto',
  },
  marker: {
    width: 50,
    height: 50,
  },
})
