import React, { useCallback, useState, useEffect, useRef } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'
import mapStyle from '../../constants/mapStyle'
import View from '../../components/View/View'
import useUserLocation from './UserMarker/useUserLocation'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MAP_ICONS } from '../EventForm/constants'
import { IEvent } from '../../Models/Event'
import MapFilter from '../../components/MapFilter/MapFilter'
import { useMapFilter } from '../../store/mapFilterSlice'
import useMarkers from './hooks/useMarkers'

export default function Home() {
  const navigation = useNavigation()
  const { location } = useUserLocation()
  const { markers, requestMarkers } = useMarkers()
  const [mapRegion, setMapRegion] = useState<Region | null>(null)

  const { filters } = useMapFilter()

  const [showOverlay, setShowoverlay] = useState(false)

  const displayDetails = ({ id, title }: IEvent.IMarkers) => {
    if (mapRegion) setMapRegion(null)
    navigation.navigate('EventDetails', {
      preview: { id, title },
    })
  }

  useFocusEffect(
    useCallback(() => {
      setShowoverlay(false)
      return () => {
        setShowoverlay(true)
      }
    }, [navigation])
  )

  useFocusEffect(
    useCallback(() => {
      if (location) requestMarkers(location, filters)
    }, [location, JSON.stringify(filters)])
  )

  useEffect(() => {
    if (location) setMapRegion(location)
  }, [location])

  return (
    <View style={styles.container}>
      <MapView
        minZoomLevel={11}
        style={styles.map}
        showsMyLocationButton={false}
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
      <MapFilter />
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
    zIndex: 3,
    backgroundColor: '#00000081',
  },
})
