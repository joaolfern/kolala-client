import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MapView, { MapEvent, Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
// @ts-ignore
import coffee from '../assets/mapIcons/coffee.png'

// @ts-ignore
import { ENVIRONMENT } from "@env"


const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]

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
        {
          markers.map(marker => (
            <Marker
              key={123123}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              image={coffee}
            />
          ))
        }
      </MapView>
    </View>
  );
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
