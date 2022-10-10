import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Callout, Marker, Region } from 'react-native-maps'
import mapStyle from '../../constants/mapStyle'
import View from '../../components/View/View'
import { getMarkers, IMarkers } from './api'
import useUserLocation from './UserMarker/useUserLocation'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MAP_ICONS } from '../EventForm/constants'

export default function Home() {
  const navigation = useNavigation()
  const { userLocation } = useUserLocation()
  const [markers, setMarkers] = useState<IMarkers[]>([])
  const [mapRegion, setMapRegion] = useState<Region | null>(null)

  const [showOverlay, setShowoverlay] = useState(false)

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

  useFocusEffect(
    useCallback(() => {
      if (userLocation) requestMarkers(userLocation)

      return () => {}
    }, [userLocation])
  )

  const displayDetails = (marker: IMarkers) => {
    if (mapRegion) setMapRegion(null)
    navigation.navigate('EventDetails', {
      marker,
    })

    setShowoverlay(true)
  }

  useFocusEffect(
    useCallback(() => {
      setShowoverlay(false)
    }, [])
  )

  useEffect(() => {
    if (userLocation) setMapRegion(userLocation)
  }, [userLocation])

  return (
    <View style={styles.container}>
      <MapView
        minZoomLevel={11}
        style={styles.map}
        customMapStyle={mapStyle}
        // @ts-ignore
        region={mapRegion}
        showsUserLocation={true}
      >
        {markers.map((marker, idx) => {
          return (
            <Marker
              key={marker.lat + marker.lng + idx}
              title={marker.title}
              image={MAP_ICONS[marker.icon || 0]}
              onPress={() => displayDetails(marker)}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng,
              }}
            />
          )
        })}
      </MapView>
      {showOverlay && <View style={styles.overlay} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  map: {
    height: Dimensions.get('window').height + 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  marker: {
    width: 50,
    height: 50,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: '#00000081',
  },
})

{
  /* <Callout>
<EventDetails
  marker={selectedMarker}
  closeDetails={closeDetails}
/>
</Callout>
</Marker> */
}
