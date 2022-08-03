import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { NavigationState } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import blankProfile from '../../assets/images/blank-profile.png'
import Colors from '../../constants/Colors'
import Span from '../Span/Span'

type IProps = BottomTabBarProps & {
  route: NavigationState['routes'][0]
  index: number
}

function ProfileTabButton({
  route,
  descriptors,
  index,
  state,
  navigation,
}: IProps) {
  const { options } = descriptors[route.key]

  const isFocused = state.index === index

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name)
    }
  }

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    })
  }

  return (
    <TouchableOpacity
      accessibilityRole='button'
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.Button}
    >
      <Span style={styles.IconWrapper}>
        <Image source={blankProfile} style={styles.Icon} />
      </Span>
      <Span style={styles.onlineMarker} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Button: {
    marginLeft: 22,
    position: 'relative',
  },
  IconWrapper: {
    borderRadius: 99999,
    overflow: 'hidden',
  },
  Icon: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: 51,
    height: 51,
  },
  onlineMarker: {
    borderRadius: 99999,
    width: 15,
    height: 15,
    backgroundColor: Colors.green,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
})

export default ProfileTabButton
