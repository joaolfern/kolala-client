import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import {
  NavigationState,
  ParamListBase,
  TabNavigationState,
  useNavigation,
} from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useMarkers from '../../screens/Home/hooks/useMarkers'
import Button from '../Button/Button'
import Span from '../Span/Span'
import Text from '../Text/Text'
import HangsButton from './HangsButton'

function EventsButton() {
  const navigation = useNavigation()
  const { markers } = useMarkers()

  const onPress = () => {
    navigation.navigate('EventsOverview')
  }

  return (
    <Span style={styles.Wrapper}>
      <HangsButton />
      <Button
        accessibilityRole='button'
        onPress={onPress}
        style={styles.Button}
      >
        <Text style={styles.Text}>{markers.length} eventos</Text>
      </Button>
    </Span>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    alignItems: 'flex-end',
  },
  Button: {
    position: 'relative',
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    height: 43,
    maxWidth: 135,
    backgroundColor: Colors.secondaryColor,
  },
  Text: {
    color: Colors.altText,
    fontSize: 16,
    textAlign: 'right',
  },
})

export default EventsButton
