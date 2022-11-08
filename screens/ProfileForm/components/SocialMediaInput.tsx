import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Control } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import Span from '../../../components/Span/Span'
import TextInput from '../../../components/TextInput/TextInput'
import Colors from '../../../constants/Colors'
import { ProfileFormEvent } from '../ProfileForm'

interface IProps {
  control: Control<ProfileFormEvent>
  name: keyof ProfileFormEvent
  icon: any
  placeholder: string
}

function SocialMediaInput({ control, icon, name, placeholder }: IProps) {
  return (
    <Span style={styles.SocialMediaRow}>
      <MaterialCommunityIcons
        style={styles.SocialMediaIcon}
        name={icon}
        size={55}
        color={Colors.text}
      />
      <TextInput
        style={styles.SocialMediaInput}
        name={name}
        control={control}
        placeholder={placeholder}
      />
    </Span>
  )
}

export default SocialMediaInput

const styles = StyleSheet.create({
  SocialMediaRow: {
    flexDirection: 'row',
  },
  SocialMediaIcon: {
    marginRight: 16,
    width: 55,
  },
  SocialMediaInput: {
    flex: 1,
  },
})
