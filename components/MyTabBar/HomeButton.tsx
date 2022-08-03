import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { NavigationState } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Compass from '../../assets/images/compass.svg'
import Span from '../Span/Span'

type IProps = BottomTabBarProps & {
  route: NavigationState['routes'][0]
  index: number
}

function HomeButton({ route, descriptors, index, state, navigation }: IProps) {
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
    <Span style={styles.Wrapper}>
      <TouchableOpacity
        accessibilityRole='button'
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.Button}
      >
        <Compass />
      </TouchableOpacity>
    </Span>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Button: {},
  Icon: {
    aspectRatio: 1,
    width: 51,
    height: 51,
  },
})

export default HomeButton
