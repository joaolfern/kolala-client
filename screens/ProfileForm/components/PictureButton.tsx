import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Avatar from '../../../components/Avatar/Avatar'
import Colors from '../../../constants/Colors'
import { IProfileViewData } from '../../../types/Profile'
import { ProfileFormEvent } from '../ProfileForm'

interface IProps {
  profile: IProfileViewData
  name: keyof ProfileFormEvent
}

// 🎈🎈 TODO

function PictureButton({ profile }: IProps) {
  return (
    <TouchableOpacity style={styles.PictureButton}>
      <MaterialIcons
        style={styles.PictureIcon}
        name='camera-alt'
        size={30}
        color={Colors.text}
      />
      <Avatar
        style={styles.Picture}
        source={profile?.picture ? { uri: profile.picture } : undefined}
      />
    </TouchableOpacity>
  )
}

export default PictureButton

const styles = StyleSheet.create({
  Picture: {
    width: 150,
    height: 150,
  },
  PictureButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  PictureIcon: {
    position: 'absolute',
    zIndex: 10,
  },
})
