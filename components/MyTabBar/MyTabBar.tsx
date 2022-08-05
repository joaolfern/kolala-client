import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import EventsButton from './EventsButton'
import HomeButton from './HomeButton'
import ProfileTabButton from './ProfileTabButton'

function MyTabBar({ state, ...rest }: BottomTabBarProps) {
  const [map] = state.routes

  return (
    <View style={styles.TabBar}>
      <ProfileTabButton />
      <HomeButton state={state} index={1} route={map} {...rest} />
      <EventsButton />
    </View>
  )
}

const styles = StyleSheet.create({
  TabBar: {
    flexDirection: 'row',
    elevation: 0,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})

export default MyTabBar
