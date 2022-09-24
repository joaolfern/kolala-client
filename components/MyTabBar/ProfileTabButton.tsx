import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { NavigationState, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import blankProfile from '../../assets/images/blank-profile.png'
import Colors from '../../constants/Colors'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import Span from '../Span/Span'

function ProfileTabButton() {
  const navigation = useNavigation()
  const { profile } = useAppSelector(selectUser)

  const onPress = () => {
    navigation.navigate('Profile', {
      profileUserId: profile?.id as number,
    })
  }

  return (
    <TouchableOpacity
      accessibilityRole='button'
      onPress={onPress}
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
