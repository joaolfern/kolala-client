import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import {
  NavigationState,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import Button from '../Button/Button'
import Span from '../Span/Span'
import Text from '../Text/Text'
import HangsButton from './HangsButton'

type IProps = BottomTabBarProps & {
  route: NavigationState['routes'][0]
  index: number
}

function EventsButton({
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

  // 🎈🎈 TODO COUNTER

  return (
    <Span style={styles.Wrapper}>
      <HangsButton />
      <Button
        accessibilityRole='button'
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.Button}
      >
        <Text style={styles.Text}>3 eventos</Text>
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
