import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import AvatarOnlineStatus from '../AvatarOnlineStatus/AvatarOnlineStatus'

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
      <AvatarOnlineStatus
        isOnline={true}
        source={profile?.picture ? { uri: profile.picture } : undefined}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Button: {
    marginLeft: 22,
  },
})

export default ProfileTabButton
