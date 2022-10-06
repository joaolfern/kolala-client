import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { MAP_ICONS } from '../../screens/EventForm/constants'
import { IMarkers } from '../../screens/Home/api'

function CustomMarker({ marker }: { marker: IMarkers }) {
  const [shouldTrack, setShouldTrack] = useState(true)

  return (
    <Marker
      tracksInfoWindowChanges={shouldTrack}
      title={marker.title}
      coordinate={{
        latitude: marker.lat,
        longitude: marker.lng,
      }}
    >
      <Image
        style={[styles.marker]}
        source={MAP_ICONS[marker.icon || 0]}
        onLoad={() => setShouldTrack(false)}
        resizeMode='cover'
      />
    </Marker>
  )
}

export default CustomMarker

const styles = StyleSheet.create({
  marker: {
    width: 50,
    height: 50,
  },
})
