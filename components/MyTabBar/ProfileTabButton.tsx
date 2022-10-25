import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import AvatarOnlineStatus from '../AvatarOnlineStatus/AvatarOnlineStatus'

function ProfileTabButton() {
  const navigation = useNavigation()
  const { user } = useAppSelector(selectUser)

  const onPress = () => {
    navigation.navigate('Profile', {
      profileUserId: user?.id as number,
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
        source={
          user?.profile?.picture ? { uri: user.profile.picture } : undefined
        }
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Button: {
    marginLeft: 16,
  },
})

export default ProfileTabButton
